import surveysService from '../services/surveys'
import { Survey } from 'server/types'
import { Request, Response } from 'express'

export async function getSurvey(req: Request, res: Response, next: any) {
  try {
    const { id } = req.params

    const survey: Survey = await surveysService.findSurveyById(id)
    res.json(survey)
  } catch (error) {

  }
}

export async function getSurveys(req: Request, res: Response, next: any) {
  try {
    const user = res.locals.user
    const surveys = await surveysService.findAllByUser(user.id)
    res.json(surveys)
  } catch (e) {
    console.log('error', e);

  }
}

export async function createSurvey(req: Request, res: Response, next: any) {
  try {
    const user = res.locals.user
    let data: Survey = req.body
    data.userId = user.id

    const surveyResponse = await surveysService.create(data)
    res.json(surveyResponse)
  } catch (e) {
    if (e) {
      res.status(422).json(e)
      throw new Error('Cannot find survey')
    } else {
      next(e)
    }
  }
}

export async function updateSurvey(req: Request, res: Response, next: any) {
  try {
    const surveyId = req.params.id
    const data: Survey = req.body

    await surveysService.update(surveyId, data)
    res.status(201).send('Survey updated!')
  } catch (e) {
    if (e) {
      res.status(422).json(e)
    } else {
      next(e)
    }
  }
}

export async function getAnswersFromUsers(req: Request, res: Response, next: any) {
  try {
    const { surveyId } = req.params
    const responses = await surveysService.getAnswersFromUsers(Number(surveyId))
    res.json(responses)
  } catch (e) {
    if (e) {
      console.log('erorr---------', e);

      res.status(422)
    } else {
      next(e)
    }
  }
}