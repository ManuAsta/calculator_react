# Calculator Using React


# External Libraries Used
1) React Toastify: For showing notificaitons for Infinity or an invalid answer, and wrong expressions entered
2) Mathjs: For evaluating the final expression using evaluate method from math js library, we can add extra functionalities to our app in future using various methods from this library


# Approach
1) Draw rough sketch of how calculator should look like
2) Build the calculator using css and React Components
3) For Functionalities:
    a) useReducer hook for varities of functions like operations/dot/equal since there are many buttons, categorization of buttons into numbers, operations, dot, equal, clear reduces the code
    b) The user can enter an expression and see the whole expression on the calculator, similar to a phone calculator app and when the use enters equal, the expression is evaluated
    c) the math js library evaluate() method is used for evaluating the final expression
4) Edge Cases:
    a) If the user enters 0/0 or 1/0  or any such expression, it will display an invalid answer notification and the user can change the expression again using the backspace button
    b) If the expression already has a dot like (8.5) and if the user clicks dot again,it would show invalid expression notification because (8.5.) is invalid number
    c) If the user clicks on dot after an operation like (5+) , then automatically a zero is appended after the operation to 5+0. , this would be a good user experiences when the user wants to type .2 instead of 0.2
    d) If there is only a single number, and the user clicks backspace, the expression should reset to 0



# Go Live:
https://65c23465bcdcc704edbae1f7--jovial-macaron-849bab.netlify.app/