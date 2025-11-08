const container = document.querySelector('.container')
const questionBox = document.querySelector('.question')
const choicesBox = document.querySelector('.choices')
const nextBtn = document.querySelector('.nextBtn')
const scoreCard = document.querySelector('.scoreCard')
const alert = document.querySelector('.alert')
const startBtn = document.querySelector('.startBtn')
const timer = document.querySelector('.timer')




// Array for question, answers and choice
const quiz =[
    {
        question:"What does ANN stand for in the context of machine learning?",
        choices:["Artificial Numerical Network ","Artificial Neural Network","Advanced Neural Network","Adaptive Neural Network"],
        answer:"Artificial Neural Network"
    },
    {
        question:"Which of the following is a primary component of an artificial neural network?",
        choices:["Synapse","Node (Neuron)","Atom", "Layer"],
        answer:"Node (Neuron)"
    },
    {
        question:"What activation function outputs values between 0 and 1?",
        choices:["Sigmoid","ReLU","Tanh","Linear"],
        answer:"Sigmoid"
    },
    {
        question:"What type of neural network is commonly used for image recognition?",
        choices:[" Feedforward Neural Network","Convolutional Neural Network (CNN)"," Recurrent Neural Network (RNN)"," Radial Basis Function Network"],
        answer:"Convolutional Neural Network (CNN)"
    },
    {
        question:"What is the primary purpose of backpropagation in an ANN?",
        choices:["Data preprocessing","Optimization of weights","Activation function selection","Input layer initialization"],
        answer:"Optimization of weights"
    },
    {
        question:"Which algorithm is commonly used to optimize the weights in an ANN?",
        choices:["Decision Tree"," K-Nearest Neighbors","Gradient Descent","Random Forest"],
        answer:"Gradient Descent"
    },
    {
        question:"What is overfitting in the context of neural networks?",
        choices:["The model is too simple to capture patterns in data.","The model performs well on training data but poorly on test data.","The model is trained on insufficient data."," The model does not converge during training."],
        answer:"The model performs well on training data but poorly on test data."
    },
    {
        question:"What is the function of a bias term in a neuron?",
        choices:["Adjusts the learning rate","Provides additional flexibility to the model","Prevents overfitting","Regulates the output range"],
        answer:"Provides additional flexibility to the model"
    },
    {
        question:"What is a perceptron?",
        choices:["A single-layer feedforward network","A multi-layer neural network","A probabilistic model","A decision tree classifier"],
        answer:"A single-layer feedforward network"
    },
    {
        question:"Which of the following is a deep learning framework?",
        choices:["TensorFlow","NumPy","Pandas","Matplotlib"],
        answer:"TensorFlow"
    },
    {
        question:"Which of these is NOT a type of neural network architecture?",
        choices:["Feedforward Network","Convolutional Neural Network","Random Neural Network","Recurrent Neural Network"],
        answer:"Random Neural Network"
    },
    {
        question:" What type of data is most suitable for Recurrent Neural Networks (RNNs)?",
        choices:["Image data","Sequential data","Tabular data","Categorical data"],
        answer:"Sequential data"
    },
    {
        question:"What does the term 'epoch' refer to in neural network training?",
        choices:["A single step of forward propagation","One complete pass through the training dataset","A specific number of layers in the network","The initialization phase of weights"],
        answer:"One complete pass through the training dataset"
    },
    {
        question:"What problem does the softmax function solve in ANN?",
        choices:["Binary classification"," Clustering","Multi-class classification","Regression"],
        answer:"Multi-class classification"
    },
    {
        question:"Dropout is a technique used to prevent what?",
        choices:["Underfitting","Vanishing gradients","Exploding gradients","Overfitting"],
        answer:"Overfitting"
    },
];

//making varible
let currentQuestionIndex=0;
let score = 0;
let quizOver=false;
let timeleft=30
let timeID=null;

//Arrow function to show questions
const showQuestions =() =>{
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent=questionDetails.question;

    choicesBox.textContent="";
    for (let i=0; i<questionDetails.choices.length;i++){
        const currentchoice=questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent=currentchoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);
        choiceDiv.addEventListener('click',()=>{
            if(choiceDiv.classList.contains('selected')){
                choiceDiv.classList.remove('selected');
            }
            else{
                choiceDiv.classList.add('selected');
            }
        });
    }
    if (currentQuestionIndex<quiz.length){
        startTimer();
    }
    
}

//function to check answer
const checkAnswer=() => {
    const selectedChoice = document.querySelector('.choice.selected');
    if(selectedChoice.textContent===quiz[currentQuestionIndex].answer){
        displayAlert("Correct Answer!");
        score++;
    }
    else{
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeleft=30;
    currentQuestionIndex++;
    if (currentQuestionIndex<quiz.length){
        showQuestions();
    }
    else{
        showScore();
        stopTimer();
        quizOver=true;
        timer.style.display="none"
    }
}
 
//function to show score
const showScore =() =>{
    questionBox.textContent="";
    choicesBox.textContent="";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have Completed Your Quiz!");
    nextBtn.textContent="Play Again";
    
}

//function to show Alert
const displayAlert=(msg) =>{
    alert.style.display ="block";
    alert.textContent=msg;
    setTimeout(()=>{
        alert.style.display="none";
    },3000);
}

//function to start Timer
const startTimer =()=>{
    clearInterval(timeID);
    timer.textContent=timeleft;
    const countDown =()=>{
        timeleft--;
        timer.textContent=timeleft;
        if(timeleft===0){
            const confirmUser =confirm("Time Up!!! Do you want to play Again");
            if (confirmUser){
                timeleft=30;
                startQuiz();
            }
            else{
                startBtn.style.display='block';
                container.style.display='none';
                return;
            }

        }
    }
    timerID=setInterval(countDown,1000);
}

//funtio to stop timer
const stopTimer=()=>{
    clearInterval(timerID);

}

//function to start quiz
const startQuiz=()=>{
    timeleft=30;
    timer.style.display="flex";
    shuffleQuestions();
}

//function to shuffle question 
const shuffleQuestions=()=>{
    for (let i=quiz.length-1; i>0;i--){
        const j = Math.floor(Math.random()* (i+1));
        [quiz[i], quiz[i]]=[quiz[j],quiz[i]];
    }
    currentQuestionIndex=0;
    showQuestions();
} 





//adding event listener to start Button 
startBtn.addEventListener('click',()=>{
    startBtn.style.display="none";
    container.style.display="block";
    startQuiz();
})



nextBtn.addEventListener('click',()=>{
    const selectedChoice =document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent==="Next"){
        displayAlert("Select Your Answer");
        return;
    }
    if(quizOver){
        nextBtn.textContent="Next";
        scoreCard.textContent="";
        currentQuestionIndex=0;
        quizOver=false;
        score=0;
        startQuiz();
    }
    else{
    checkAnswer();
    }
});

