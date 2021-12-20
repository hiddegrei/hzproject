export default class Han{

     

    public static constrain(val: number,a: number,b: number){
     if (val<a){
       return a
     }else if(val>b){
       return b
     }else{
       return val
     }
  
   }
   public constrain(val: number,a: number,b: number){
    if (val<a){
       return a
     }else if(val>b){
       return b
     }else{
       return val
     }
   }
  public static map(n: number, start1: number, stop1: number, start2: number, stop2: number, withinBounds: any){
   const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    if (!withinBounds) {
      return newval;
    }
    if (start2 < stop2) {
      return this.constrain(newval, start2, stop2);
    } else {
      return this.constrain(newval, stop2, start2);
    }
  }
          
    
  }