## Solution 
```java
public class Solution {
    public List<int[]> kSmallestPairs(int[] nums1, int[] nums2, int k) {
        List<int[]> res = new ArrayList<>();
        if (nums1.length == 0 || nums2.length == 0 || k == 0) return res;
        PriorityQueue<int[]> q = new PriorityQueue<>((a,b) -> a[0] + a[1] - b[0] - b[1]);
        for (int i = 0; i < nums1.length && i < k; i++) q.offer(new int[] {nums1[i], nums2[0], 0}); //The index is always 0 here
        while (k-- > 0 && !q.isEmpty()) { //Do not forget to check the value of k
            int[] cur = q.poll();
            res.add(new int[] {cur[0], cur[1]});
            int indexOfNums2 = cur[2];
            if (indexOfNums2 < nums2.length - 1) q.offer(new int[] {cur[0], nums2[++indexOfNums2], indexOfNums2});
        }
        return res;
    } 
}
```

## Analysis 
This solution is making use of `PriorityQueue` provided in Java library   
We first construct our queue passing the lambada comparator `new PriorityQueue<>((a,b) -> a[0] + a[1] - b[0] - b[1])`  
Then we loop through the first given array `nums1` (of course you can loop the `nums2`, it does not really matter)  
We construct an int array with every element from looping array `nums1[i]`,  `nums2[0]`, and index `0`  
The idea behind this is that we know for every number in `nums1`, the smallest sum pair is with the **first** element in `nums2`, because they are both sorted in increasing order  
Then we do a while loop as long as `k-- > 0` and the queue is not empty  
We pop the array from queue, and then construct the pair and add the array to our result  
After that, if index of `nums2`, which is the third element of array from our queue, is not the last one, we construct a new pair with next element from `nums2` and add it to our queue  
Since we define our `PriorityQueue` with the sum, we guarantee we get the k smallest pairs  ;)  