
const GreetingHook = () => {
    const date = new Date();
    const hours = date.getHours();
    const months = [
      "January", 
      "February", 
      "March", 
      "April", 
      "May", 
      "June", 
      "July", 
      "August", 
      "September", 
      "October", 
      "November", 
      "December"
    ]
  
    let month = months[date.getMonth()]
    
   let today = `${date.getUTCDate()} ${month} ${date.getFullYear()}`
  
    let greeting = "";
  
    if (hours > 0 && hours < 12) {
      greeting = "Good morning";
    } 
    else if (hours >= 12 && hours < 18) {
      greeting = "Good afternoon";
    } 
    else if (hours >= 18 && hours < 21) {
      greeting = "Good evening";
    } 
    else {
      greeting = "Good night";
    }

    return {today,greeting}
}

export default GreetingHook
