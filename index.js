function validateNumberOfInputs(argv) {
    if (process.argv.length !== 7) {
        console.log(`
          You gave ${process.argv.length - 2} arguments(s) to the program
      
          Please provide 5 arguments for
          
          weight (kg), 
          height (m), 
          age (years), 
          whether you exercise daily (yes or no)
          and your gender (m or f)
          
          Example:
      
          $ node index.js 82 1.79 32 yes m
        `);
      
        process.exit();
      };
}

function validateWeightHeightAndAge(weightInKg, heightInM, ageOfUser){
    if (isNaN(weightInKg) || isNaN(heightInM) || isNaN(ageOfUser)) {
        console.log(`
        Please make sure weight, height and age are numbers:
        
        weight (kg) example: 82 | your input: ${process.argv[2]}
        height (m) example: 1.79 | your input: ${process.argv[3]}
        age (years) example: 32  | your input: ${process.argv[4]} 
            
        Example:
    
        $ node index.js 82 1.79 32 yes m
            `);
      
        process.exit();
      };

    if (ageOfUser < 20) {
        console.log(`
        This BMI calculator is designed for people above 20 years old.
        `);
        
        process.exit();
    };    

    if (weightInKg < 30 || weightInKg > 300 ) {
        console.log(`
        Please provide a number for weight in kilograms between 30 and 300.
    
        Example:
    
        Weight (kg): 65 || Your input: ${process.argv[2]}
        `);
    
        process.exit();
    };
}

function validateDailyExercise(dailyExercise){
    if (dailyExercise !== "yes" && dailyExercise !== "no") {
        console.log(`
        Please specify if you exercise daily with "yes" or "no".
    
        Example:
    
        Do you exercise daily? yes || Your input: ${process.argv[5]}
        `);
    
        process.exit();
    };
}

function validateGender(genderOfUser){
    if (genderOfUser !== "m" && genderOfUser !== "f") {
        console.log(`
        Please specify if you are a male or a female with "m" or "f".

        Example: 

        What is your gender? "m" || Your input: ${process.argv[6]}
        `)
    }
}

function calculateBMI(weightInKg, heightInM) {
    return weightInKg / (heightInM * heightInM);
}

function calculateBMR(weightInKg, heightInM, ageOfUser, genderOfUser) {
    const heightInCm = heightInM * 100;
    return genderOfUser === "m" 
        ? 10 * weightInKg + 6.25 * heightInCm - 5 * ageOfUser + 50 
        : 10 * weightInKg + 6.25 * heightInCm - 5 * ageOfUser - 150 ;
}

function calculateIdealWeight(heightInM) {  
    return 22.5 * heightInM * heightInM; 
}

function calculateDailyCalories(dailyExercise, BMR){
    return dailyExercise === "yes" 
        ? BMR * 1.6 
        : BMR * 1.4;
}

function calculateWeightToLose(weightInKg,idealWeight) {
    return weightInKg - idealWeight;
}

function calculateDietWeeks(weightToLose) {
    return Math.abs(weightToLose / 0.5);
}

function calculateDietCalories(weightToLose, dailyCalories) {
    return weightToLose > 0     
        ? dailyCalories - 500 
        : dailyCalories + 500;
} 

function formatOutput(userObject) {
    return `
    **************
    BMI CALCULATOR
    **************

    age: ${userObject.age} years
    gender: ${userObject.gender}
    height: ${userObject.heightInM} m
    weight: ${userObject.weightInKg} kg
    do you exercise daily? ${userObject.dailyExercise}

    ****************
    FACING THE FACTS
    ****************

    Your BMI is ${userObject.BMI}

    A BMI under 18.5 is considered underweight
    A BMI above 25 is considered overweight

    Your ideal weight is ${userObject.idealWeight} kg
    With a normal lifestyle you burn ${userObject.dailyCalories} calories a day

    **********
    DIET PLAN
    **********

    If you want to reach your ideal weight of ${userObject.idealWeight} kg:

    Eat ${userObject.dietCalories} calories a day
    For ${userObject.dietWeeks} weeks
    `;
}

function bmiCalculator() {
    
    validateNumberOfInputs(process.argv);

    const weightInKg = parseInt(process.argv[2]);
    const heightInM = parseFloat(process.argv[3]);
    const ageOfUser = parseInt(process.argv[4]);
    const dailyExercise = process.argv[5];
    const genderOfUser = process.argv[6];

    validateWeightHeightAndAge(weightInKg, heightInM, ageOfUser);
    validateDailyExercise(dailyExercise);
    validateGender(genderOfUser);

    const BMI = calculateBMI(weightInKg, heightInM);
    const BMR = calculateBMR(weightInKg, heightInM, ageOfUser, genderOfUser);
    const idealWeight = calculateIdealWeight(heightInM);
    const dailyCalories = calculateDailyCalories(dailyExercise, BMR);
    const weightToLose = calculateWeightToLose(weightInKg, idealWeight);
    const dietWeeks = calculateDietWeeks(weightToLose);
    const dietCalories = calculateDietCalories(weightToLose, dailyCalories);

    const user = {
        age: ageOfUser,
        gender: genderOfUser,
        heightInM: heightInM,
        weightInKg: weightInKg,
        dailyExercise: dailyExercise,
        BMI: BMI,
        idealWeight: idealWeight,
        dailyCalories: dailyCalories,
        dietCalories: dietCalories,
        dietWeeks: dietWeeks
    };

    const output = formatOutput(user);
    console.log(output);
}

bmiCalculator();