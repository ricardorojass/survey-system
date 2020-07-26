import { SurveyResponse } from 'server/types'
import { Request, Response } from 'express'
import responseService from '../services/responses'

export async function createResponse(req: Request, res: Response, next: any) {
  try {
    console.log('createResponseController', req.params);
    
    const { surveyId } = req.params
    let data: SurveyResponse = req.body
    data.surveyId = Number(surveyId)

    const surveyResponseId: number = await responseService.create(data)
    res.json(surveyResponseId)
  } catch (e) {
    if (e) {
      res.status(422).json(e)
      throw new Error('Response cannot be created')
    } else {
      next(e)
    }
  }
}
