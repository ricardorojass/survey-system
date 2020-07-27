import { SurveyResponse, Answer } from 'server/types'
import { Request, Response } from 'express'
import responseService from '../services/responses'

export async function createResponse(req: Request, res: Response, next: any) {
  try {
    const surveyId = Number(req.params.id)
    const answers: number[] = req.body

    await responseService.create(surveyId, answers)

    res.status(200).send('Response created succesfully!')
  } catch (e) {
    if (e) {
      res.status(422).json(e)
      throw new Error('Response cannot be created')
    } else {
      next(e)
    }
  }
}

export async function findResponseById(req: Request, res: Response, next: any) {
  try {
    console.log('findResponseById', req.params)
    res.json({})
  } catch (e) {
    if (e) {
      res.status(422).json(e)
      throw new Error('Response cannot be created')
    } else {
      next(e)
    }
  }
}


