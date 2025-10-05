## Inspiration
As college students, we have first hand experience of the struggle to allocate our spending money over the course of the semester/school year. Many of our friends and fellow college students have a shared experience where they spend the spending money they make over the summer in the first few weeks back at school and then are left broke for the rest of the semester. Other budgeting apps that allow users to set weekly goals often don't work for college students because every week in college is different. That's where our idea for *Spent* was born. What if AI told you how much money you are going to spend before you spend it? Gone are the days of budgeting out the small amount of money you have left after you've spent 90% of your savings. It's time to get ahead of your spending and make financial decisions and alterations before the money leaves your wallet. 

## What it does
Spent helps college students make financial budgeting decisions through predicted spending based on their scheduled events to guide students financially before the money is spent. While our target audience is college students, Spent can be scaled to help anyone who wants to have a better understanding of their spending. 

Spent takes the events in your Google Calendar and uses AI to estimate how much you will spend at each event. It tells you the three different prices each event will cost based on which of three experiences you choose to have (what you order, how you will get there, etc.) and allows you to make decisions for your event experiences while seeing the impact on your wallet as a whole, ahead of time. 

## How we built it
We built our application on React using JavaScript. We use Google's OAuth2 client to login with Google and the Google Calendar API to read events from the user's Google Calendar. We prompt engineer using the collected Google Calendar events and then call the Gemini API for prices and suggested experiences which we output to the user. Ideally Spent will be a mobile app but for the sake of fast development we choose to develop a React web application during the scope of HackHarvard. 

## Challenges we ran into
It was challenging parsing the output from Gemini into the table we wanted. We had difficulty getting the events from Google Calendar to continuously output after being processed (the events would show and then disappear). We resolved these challenges through the help of collaboration, talking through the code together, and Microsoft Copilot. We were racing a bit to implement all of the base features we wanted to include within the given time frame of the hackathon. 

## Accomplishments that we're proud of
We're proud to have successfully used the Gemini API for our first time to create a tool that we will be using ourselves. We're proud of our approach to this hackathon. This time we spent a lot more time thinking through the problem we wanted to solve and planning out the key parts of our project before starting to code. We know now that software engineering is 90% thinking and planning and were able to apply that mindset to this project. We were pleasantly surprised by how much functionality we were able to implement for our web application on such a short timeline. 

## What we learned
We learned how to create a web application from scratch using React. We learned how to integrate Google's Calendar and Gemini APIs. We learned more about useStates in Javascript. We learned how to code using AI tools. We were able to apply the business and ideation skills in our Business and Innovation/Entrepreneurship classes to creating a technical project from start to finish which was very rewarding for us. As hackathon buddies over the years, we are really proud of our growth together. This hackathon was really a culmination and sharing of all of our learnings together inside and outside the classroom. 

## What's next for Spent
We have many more feature ideas we are excited to implement for Spent in the future. 
- Integrate a database to store user information
- Add a calendar view with predicted spend per day 
- Add savings goals and progress
- Add decision making guidance feature (advice from Gemini about overall predicted spending and the pros and cons to accepting a student job vs participating in career-related clubs)
- Add way to add suggested events to Google Calendar (ex: cooking at home is cheaper than eating out --> Gemini sees an opening on your Wednesday night --> schedule 6-8pm Wednesday calendar event for meal prepping)


