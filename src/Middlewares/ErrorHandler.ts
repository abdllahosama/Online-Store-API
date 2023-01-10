import express from 'express'

/**
 * this method handel error message
 * if return we print just error so that user never see file strucsher
 * if not return error we go to next step
 */
const errorHandler = (
    error: Error,
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
): void => {
    // return status bad request with error message
    response.status(400).json(error.message)
}

export default errorHandler
