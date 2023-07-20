const prompt = require("prompt-sync")();

const deposit = () =>{
      while (true){
       const  depositAmount =  prompt("Enter a deposit amount : ");
       const numberDepositAmount = parseFloat(depositAmount);


       if(isNaN(numberDepositAmount) || numberDepositAmount <=0){
            console.log("invalid deposit amount, try again.");
       }else{
            return numberDepositAmount;
       }
      }

};
const getNumberOfLines = () =>{
      const deposit = () =>{
            while (true){
             const  lines =  prompt("Enter the number of lines : ");
             const numberOfLines = parseFloat(numberOfLines);
      
      
             if(isNaN(numberOfLines) || numberOfLines <=0 || numberOfLines > 3){
                  console.log("invalid deposit amount, try again.");
             }else{
                  return numberOfLines;
             }
            }
      };
      const getbet = (balance) => {
            const deposit = () =>{
                  while (true){
                  const bet = prompt("Enter the Bet per lines");
                        
                  const numberOfBet = parseFloat(numberOfBet);
            
            
                   if(isNaN(numberOfBet) || numberOfBet<=0 ||  numberOfBet > balance / lines){
                        console.log("invalid deposit amount, try again.");
                   }else{
                        return numberDepositAmount;
                   }
                  }
      }
}
};

const depositAmount = deposit();
const numberOfLines = getNumberOfLines();

