/* eslint-disable no-console */
import { AxiosError } from 'axios';

export const logError = (error: unknown, errorMessage: string) => {
  if (error instanceof AxiosError) {
    console.error(`${errorMessage}:`, error.response ? error.response.data : error.message);
  } else {
    console.error('An unknown error occurred:', error);
  }
};
