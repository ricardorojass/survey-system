import { Request, Response } from 'express'
import { Question } from 'server/types'
import questionsService from '../services/questions'

export async function createQuestion(req: Request, res: Response, next: any) {
  try {
    const surveyId = Number(req.params.id)
    let data: Question = req.body
    data.surveyId = surveyId
    
    const questionResponse = await questionsService.create(data)
    
    res.status(200).json(questionResponse)
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
    const data: Question = req.body

    await questionsService.update(questionId, data)
    res.status(204).send('Survey updated!')
  } catch (e) {
    if (e) {
      res.status(422).json(e)
    } else {
      next(e)
    }
  }
}

export async function deleteQuestion(req: Request, res: Response, next: any) {
  try {
    
    const { id } = req.params

    await questionsService.deleteById(Number(id))
    res.status(204).send('Question deleted!')
  } catch (e) {
    if (e) {
      res.status(422).json(e)
    } else {
      next(e)
    }
  }
}