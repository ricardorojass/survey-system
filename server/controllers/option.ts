import { Option } from 'server/types'
import { Request, Response } from 'express'
import optionsService from '../services/options'

export async function createOption(req: Request, res: Response, next: any) {
  try {
    let data: Option = req.body
    
    const optionResponse: Option = await optionsService.create(data)
    res.status(200).json(optionResponse)
  } catch (e) {
    if (e) {
      res.status(422).json(e)
    } else {
      next(e)
    }
  }
}

export async function updateOption(req: Request, res: Response, next: any) {
  try {
    const { questionId, optionId } = req.params
    const data: Option = req.body
    data.questionId = questionId

    const response: Option = await optionsService.update(optionId, data)
    res.status(204).send(response)
  } catch (e) {
    if (e) {
      res.status(422).json(e)
    } else {
      next(e)
    }
  }
}

export async function deleteOption(req: Request, res: Response, next: any) {
  try {
    const { id } = req.params

    await optionsService.deleteById(Number(id))
    res.status(204)
  } catch (e) {
    if (e) {
      res.status(422).json(e)
    } else {
      next(e)
    }
  }
}