import { Router } from 'express';
import { getDevices } from '../services/deviceService.js';

const deviceRouter = Router();

deviceRouter.get('*', async (req, res) => {
	const devices = await getDevices();
	res.status(200).json(devices);
});

export default deviceRouter;
