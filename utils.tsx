import { Path, UseFormSetError } from "react-hook-form";
import { EditMyCityDialog, GeolocationDialog, MyCityDialog } from './dialogs';
import { CENTER, DIALOGS } from './constants';
import { USER_DATA_FORM } from "./Signup/UserDataForm/Constants";
import {
	DirectionsCallback,
	GetDialog,
	GetMyLocation,
	RenderRoute,
} from './types';
import { LocalStorageValue } from '~/hooks/use-local-storage/types';

export const checkIsPasswordConfirmed = <F>(
  password: string,
  confirmation: string,
  setError: UseFormSetError<F>
) => {
  const fieldName = USER_DATA_FORM.TAGS.CONFIRMATION as Path<F>;

  if (password !== confirmation) {
    setError(
      fieldName,
      { message: USER_DATA_FORM.VALIDATION.CONFIRMATION.MATCH },
      { shouldFocus: true }
    );
    return false;
  }

  return true;
};

export const getRange: GetRange = (start, stop, step = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export const getDialog: GetDialog = (
	dialog,
	setDialog,
	myCity,
	onSelectCity,
	onLoadAutocomplete,
	onPlaceChanged
) => {
	const closeDialog = () => setDialog(null);
	const openEditMyCityDialog = () => setDialog(DIALOGS.EDIT_MY_CITY);

	switch (dialog) {
		case DIALOGS.GEOLOCATION:
			return (
				<GeolocationDialog
					open={dialog === DIALOGS.GEOLOCATION}
					onClose={closeDialog}
				/>
			);

		case DIALOGS.MY_CITY:
			return (
				<MyCityDialog
					myCity={myCity}
					open={dialog === DIALOGS.MY_CITY}
					onClose={closeDialog}
					onDecline={openEditMyCityDialog}
				/>
			);
		case DIALOGS.EDIT_MY_CITY:
			return (
				<EditMyCityDialog
					myCity={myCity}
					onLoadAutocomplete={onLoadAutocomplete}
					onPlaceChanged={onPlaceChanged}
					open={dialog === DIALOGS.EDIT_MY_CITY}
					onClose={closeDialog}
					onSelectCity={onSelectCity}
				/>
			);
		default:
			return null;
	}
};

export const getMapCenter = (
	storedCenter: LocalStorageValue | null
): google.maps.LatLngLiteral => {
	if (
		storedCenter &&
		typeof storedCenter === 'object' &&
		'lat' in storedCenter &&
		'lng' in storedCenter
	)
		return {
			lat: Number(storedCenter.lat),
			lng: Number(storedCenter.lng),
		};

	return CENTER;
};

export const renderRoute: RenderRoute = (
	destination,
	myLocation,
	map,
	directionsRenderer,
	directionsService,
	setDialog
) => {
	const directionsCallback: DirectionsCallback = (result, status) => {
		if (result && status === 'OK') {
			directionsRenderer?.setMap(map);
			directionsRenderer?.setDirections(result);
		}
	};

	if (destination) {
		if (!myLocation) {
			setDialog(DIALOGS.GEOLOCATION);
			return;
		}

		const request = {
			destination,
			origin: myLocation,
			travelMode: google.maps.TravelMode.DRIVING,
		};

		directionsService?.route(request, directionsCallback);
	} else {
		directionsRenderer?.setMap(null);
	}
};

export const getMyLocation: GetMyLocation = (setDialog, setMyLocation) => {
	const openGeolocationDialog = () => setDialog(DIALOGS.GEOLOCATION);

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position: GeolocationPosition) =>
				setMyLocation({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				}),
			openGeolocationDialog
		);

		return;
	}
	openGeolocationDialog();
};
