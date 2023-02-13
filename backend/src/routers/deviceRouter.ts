import ErrorHandlingRouter from '../classes/ErrorHandlingRouter.js';
import { getDevices } from '../services/deviceService.js';

const deviceRouter = new ErrorHandlingRouter();

deviceRouter.get('*', async (req, res) => {
	const devices = await getDevices();
	res.status(200).json(devices);
});

export default deviceRouter;
