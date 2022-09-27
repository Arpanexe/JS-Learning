/*
You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps

Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step

https://leetcode.com/problems/climbing-stairs/
*/

/**
 * @param {number} n
 * @return {number}
 */
const climbStairs = function (n) {
    let stairs = [0, 1, 2]
    for (let i = 3; i <= n; i++) {
        stairs[i] = stairs[i - 1] + stairs[i - 2]
    }
    return stairs[n]
}

function climbStairsMemoized(n, mem = []) {
    if (n === 1) return 1
    if (n === 2) return 2
    if (mem[n]) return mem[n]
    const result = climbStairsMemoized(n - 1, mem) + climbStairsMemoized(n - 2, mem)
    mem[n] = result
    return result
}