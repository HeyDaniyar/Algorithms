# [Merge Intervals](https://leetcode.com/problems/merge-intervals/#/description)

## Problem 
Given a collection of intervals, merge all overlapping intervals.   

For Example,
Given  `[1,3], [2,6], [8,10], [15,18]`
return `[1,6], [8,10], [15,18]`

## Solution 
```java
/**
 * Definition for an interval.
 * public class Interval {
 *     int start;
 *     int end;
 *     Interval() { start = 0; end = 0; }
 *     Interval(int s, int e) { start = s; end = e; }
 * }
 */
public class Solution {

    public List<Interval> merge(List<Interval> intervals) {
        if (intervals == null || intervals.size() < 2) return intervals;
        intervals.sort((a, b) -> a.start - b.start); //sort by "start" is enough cause we compare the "end" inside the loop below 
        int start = intervals.get(0).start, end = intervals.get(0).end;
        List<Interval> res = new ArrayList<>();
        for (int i = 1; i < intervals.size(); i++) {
            //overlap exists 
            if (end >= intervals.get(i).start) end = Math.max(end, intervals.get(i).end);
            //overlap does not exist, we can add this Interval to our res 
            else {
                res.add(new Interval(start, end));
                start = intervals.get(i).start;
                end = intervals.get(i).end;
            } 
        }
        res.add(new Interval(start, end)); //Do not forget to add the last compared Interval  
        return res;
    }
}
```

## Analysis 
In this solution, we first sort the given `intervals`   
Then we create two vars `start` and `end` to record current `Interval`  
If we find the next `Interval`'s `end` is <= current `start`, we know there is overlapping  
We update the `end` with the bigger end and then continue our loop  
If we do not find overlap, which is `end < intervals.get(i).start`  
We create a `new Interval` with `start` and `end` and add it to our `res` which will be the last overlapping range  
Then we update `start` and `end`, and continue the loop  
After the loop, do not forget to add the last range  