## Solution 
```java
// Java Iterator interface reference:
// https://docs.oracle.com/javase/8/docs/api/java/util/Iterator.html
class PeekingIterator implements Iterator<Integer> {
    
    //This problem is given an iterator, we just need to adding a new feature "peek()"
    //We add a new filed "next" to accomplish that.
    
    private Integer next;
    private Iterator<Integer> itr;
    
    public PeekingIterator(Iterator<Integer> iterator) {
        // initialize any member here.
        this.itr = iterator;
        this.next = itr.hasNext() ? itr.next() : null;
        
    }

    // Returns the next element in the iteration without advancing the iterator.
    public Integer peek() {
        return this.next;
    }

    // hasNext() and next() should behave the same as in the Iterator interface.
    // Override them if needed.
    @Override
    public Integer next() {
        Integer res = this.next;
        this.next = itr.hasNext() ? itr.next() : null;    
        return res;  
    }

    @Override
    public boolean hasNext() {
        return this.next != null;
    }
}
```

## Analisys 
This problem is to improve the Java's `Iterator` by implementing `peek()` method. We create two files `Integer next` and `Iterator<Integer> itr` to accomplish it. Remember to make fully use of `this.next` while implementing all its method. Notice that calling `itr.next()` inside the class `next()` function won't cause overflow exception, they are different methods in different classes (`this.itr != this`).