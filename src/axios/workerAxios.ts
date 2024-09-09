import axios from 'axios';

const WorkerServiceURL = process.env.VITE_DOCKER_WORKERS_SERVER_URL;
if (!WorkerServiceURL) {
  throw new Error(
    'VITE_INVENTORY_SERVICE_URL is not defined in the environment variables',
  );
}
const axiosInstance = axios.create({
  baseURL: WorkerServiceURL,
});
export default axiosInstance;