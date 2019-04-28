Feature: Skicka pengar

   Som kund vill jag kunna skicka pengar till andras konton. Men endast en viss mängd

Scenario: Skicka pengar till någon annans konto
Given that I visit the bank site
And I press on login
When I enter my information
Given Press the login button
Then I should log into my account
Given that I press Överföringar andra konton
And that I chose Annat konto
And that I enter account number
And that I enter amount of money that are less than my max transfer amount
And that I enter Test as a message
And I press Utför 
And I accept the pop-up
Then the money should be sent
Given that I press Start
Then I should be able to see my transaktion
Given that I press Logga ut
And that I press Logga in
When I enter the recipents information
Given Press the login button
Then I should log into the recipents account
Given that I press the Start button
Then I should be able to see the recipents transaktion