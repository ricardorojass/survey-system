import questionsService from '../services/questions'
import { Survey, Question } from 'server/types'
import { Request, Response } from 'express'

// export async function getSurvey(req: Request, res: Response, next: any) {
//   try {
//     const { id } = req.params
//     const survey: Survey = await surveysService.findSurveyById(id)
//     res.json(survey)
//   } catch (error) {
    
//   }
// }

// export async function getSurveys(req: any, res: any, next: any) {
//   try {
//     const user = res.locals.user
//     const surveys = await surveysService.findAllByUser(user.id)
//     res.json(surveys)
//   } catch (error) {
    
//   }
// }

export async function createQuestion(req: Request, res: Response, next: any) {
  try {
    const surveyId = Number(req.params.id)
    let data: Question = req.body
    data.surveyId = surveyId
    
    const questionResponse = await questionsService.create(data)
    
    res.json(questionResponse)
  } catch (e) {
    if (e) {
      res.status(422).json(e)
    } else {
      next(e)
    }
  }
}

export async function updateQuestion(req: Request, res: Response, next: any) {
  try {
    const questionId = req.params.id
    const surveyId = req.params.survey_id
    const data: Question = req.body

    await questionsService.update(surveyId, questionId, data)
    res.status(201).send('Survey updated!')
  } catch (e) {
    if (e) {
      res.status(422).json(e)
    } else {
      next(e)
    }
  }
}