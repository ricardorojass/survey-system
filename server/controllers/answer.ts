import { Answer } from 'server/types'
import answersService from '../services/answers'

export async function createAnswers(surveyResponseId: number, answers: number[]) {
  try {
    answers.forEach(async optionId => {
      const answerBody: Answer = { responseId: surveyResponseId, optionId }
      await answersService.create(answerBody)
    })
  } catch (e) {
    console.log('answer error', e);
  }
}
