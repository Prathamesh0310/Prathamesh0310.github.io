#include <stdio.h>
#include <string.h>
#include <math.h>
#include <stdlib.h>
//Complete the following function.


void calculate_the_maximum(int n, int k) {
  int i,a[100],o[100],x[100];
  for(i=1;i<=n;i++){
      a[i]=i&i+1;
      o[i]=i|i+1;
      x[i]=i^i+1;
      printf("%d\n%d\n%d",a[i],o[i],x[i]);
  }
  
}

int main() {
    int n, k;
  
    scanf("%d %d", &n, &k);
    calculate_the_maximum(n, k);
 
    return 0;
}
