import { createServer } from './services/expressService.js'

const app = await createServer()

app.listen(5000, () => {
	console.log('Server started on port 5000')
})
