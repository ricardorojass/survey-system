import surveysService from '../services/surveys'

export async function getSurveys(req: any, res: any, next: any) {
  try {
    const user = res.locals.user
    const surveys = await surveysService.findAllByUser(user.id)
    res.json(surveys)
  } catch (error) {
    
  }
}