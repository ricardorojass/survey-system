import surveysService from '../services/surveys'
import { Survey } from 'server/types'
import { Request, Response } from 'express'
import surveys from '../services/surveys'

export async function getSurvey(req: Request, res: Response, next: any) {
  try {
    const { id } = req.params
    const survey: Survey = await surveysService.findSurveyById(id)
    res.json(survey)
  } catch (error) {
    
  }
}

export async function getSurveys(req: any, res: any, next: any) {
  try {
    const user = res.locals.user
    const surveys = await surveysService.findAllByUser(user.id)
    res.json(surveys)
  } catch (error) {
    
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
    } else {
      next(e)
    }
  }
}

export async function updateSurvey(req: Request, res: Response, next: any) {
  try {
    const surveyId = req.params.id
    const data: Survey = req.body

    const survey = surveysService.update(surveyId, data)
    if (!survey) {
      res.status(400).send('Upss... something went wrong')
    } else {
      res.status(201).send('Survey updated!')
    }
  } catch (error) {
    
  }
}