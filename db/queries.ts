const insertSurvey = `insert into surveys ("userId", "title", "description", "headerUrl", "themeColor", "backgroundColor", "fontStyle") values ('24', 'first survey', 'first survey description', '', '', '', '')`
const insertResponse = `insert into responses ("surveyId") values (57)`
const insertQuestion1 = `INSERT INTO questions ("surveyId", "title", "description", "required") values (57, 'Cuanto da la suma de 2 + 2', 'No usar calculadora', true)`
const insertQuestion2 = `INSERT INTO questions ("surveyId", "title", "description", "required") values (57, 'Genero', '', true)`