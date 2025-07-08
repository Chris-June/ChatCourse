import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Beaker, Zap } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';

const Lesson1_3: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">1.3 Hands-on Exploration: Putting Theory into Practice</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-1/1.2" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-2" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Module <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Knowledge is powerful, but applied knowledge is transformative. This lesson is all about getting your hands dirty. You'll move from theory to practice, experimenting with prompts and seeing the direct impact of your choices.
      </p>

      {/* Pattern Recognition and Iteration */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Beaker className="w-7 h-7 mr-3 text-blue-400" />
          Pattern Recognition and Iteration
        </h2>
        <p className="text-gray-300 mb-4">
          The best way to learn is by doing. Your goal here is to develop an intuition for what makes a prompt work. This involves trying something, seeing the result, and refining your approach.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border-2 border-dashed border-gray-600">
          <h3 className="font-semibold text-white mb-2">Exercise: The Iterative Loop</h3>
          <p className="text-gray-400 mb-3">Open a new chat and follow these steps:</p>
          <ol className="list-decimal list-inside text-gray-300 space-y-3">
            <li className="relative">
              <CopyButton textToCopy="write some code for a button." />
              <strong>Initial Prompt (Vague):</strong> Ask the AI to <span className="font-mono text-cyan-300 pr-10">"write some code for a button."</span> Observe the generic output.
            </li>
            <li className="relative">
              <CopyButton textToCopy="You are a React developer using Tailwind CSS. Write the code for a primary action button. It should be blue, have white text, and rounded corners." />
              <strong>Second Prompt (Add Context):</strong> Now, get more specific. <span className="font-mono text-cyan-300 pr-10">"You are a React developer using Tailwind CSS. Write the code for a primary action button. It should be blue, have white text, and rounded corners."</span> Note the improvement.
            </li>
            <li className="relative">
              <CopyButton textToCopy="Building on the last response, add a hover effect that slightly lightens the blue background. Also, add a subtle box-shadow. Ensure the component accepts an 'onClick' prop and 'children' for the button text." />
              <strong>Third Prompt (Refine and Constrain):</strong> Let's perfect it. <span className="font-mono text-cyan-300 pr-10">"Building on the last response, add a hover effect that slightly lightens the blue background. Also, add a subtle box-shadow. Ensure the component accepts an 'onClick' prop and 'children' for the button text."</span>
            </li>
          </ol>
          <p className="text-yellow-300 mt-4 text-sm"><strong>Reflection:</strong> How did the AI's response change with each iteration? You guided it from a generic concept to a specific, functional component. This is the core loop of AI collaboration.</p>
        </div>
      </section>

      {/* Sandbox */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Zap className="w-7 h-7 mr-3 text-purple-400" />
          Creative Sandbox: Go Wild!
        </h2>
        <p className="text-gray-300 mb-4">
          Now it's time for free exploration. There are no right or wrong answers here. The goal is to experiment and build your confidence. Try to get the AI to do something interesting, useful, or funny.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-white mb-2">Challenge Ideas:</h4>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                    <li>Have it write a short story in the style of your favorite author.</li>
                    <li>Ask it to create a recipe based on ingredients you have in your fridge.</li>
                    <li>Get it to generate a workout plan or a travel itinerary.</li>
                    <li>Have it explain a complex scientific topic (like quantum physics) to a five-year-old.</li>
                    <li>Ask it to write a Python script to rename all files in a directory.</li>
                </ul>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-white mb-2">Things to Try:</h4>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                    <li>Use different tones (formal, sarcastic, enthusiastic).</li>
                    <li>Ask for different formats (a table, a JSON object, a poem).</li>
                    <li>Give it a very specific, weird persona to adopt.</li>
                    <li>Intentionally give it a bad prompt, then try to fix it.</li>
                    <li>See if you can get it to refuse a request (ethically!).</li>
                </ul>
            </div>
        </div>
      </section>

      {/* Prompt Design Tips */}
      <section>
        <h3 className="text-xl font-semibold text-white mb-4">Prompt Design Tips</h3>
        <p className="text-gray-400 mb-4">Here are some tips to keep in mind while you are designing your prompts:</p>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg text-blue-400 mb-2">Start Simple</h4>
            <p className="text-gray-400 mb-2">
              As you get started with designing prompts, you should keep in mind that it is really an iterative process that requires a lot of experimentation to get optimal results. Using a simple playground from OpenAI or Cohere is a good starting point.
            </p>
            <p className="text-gray-400 mb-2">
              You can start with simple prompts and keep adding more elements and context as you aim for better results. Iterating your prompt along the way is vital for this reason. As you read the guide, you will see many examples where specificity, simplicity, and conciseness will often give you better results.
            </p>
            <p className="text-gray-400">
              When you have a big task that involves many different subtasks, you can try to break down the task into simpler subtasks and keep building up as you get better results. This avoids adding too much complexity to the prompt design process at the beginning.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-blue-400 mb-2">The Instruction</h4>
            <p className="text-gray-400 mb-2">
              You can design effective prompts for various simple tasks by using commands to instruct the model what you want to achieve, such as "Write", "Classify", "Summarize", "Translate", "Order", etc.
            </p>
            <p className="text-gray-400 mb-2">
              Keep in mind that you also need to experiment a lot to see what works best. Try different instructions with different keywords, contexts, and data and see what works best for your particular use case and task. Usually, the more specific and relevant the context is to the task you are trying to perform, the better. We will touch on the importance of sampling and adding more context in the upcoming guides.
            </p>
            <p className="text-gray-400 mb-2">
              Others recommend that you place instructions at the beginning of the prompt. Another recommendation is to use some clear separator like "###" to separate the instruction and context.
            </p>
            <p className="text-gray-400">For instance:</p>
            <pre className="bg-gray-900 p-4 rounded-md text-sm text-white mt-2">
              <code>
                Prompt:
                <br />
                ### Instruction ###
                <br />
                Translate the text below to Spanish:
                <br />
                Text: "hello!"
                <br />
                <br />
                Output:
                <br />
                ¡Hola!
              </code>
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-blue-400 mb-2">Specificity</h4>
            <p className="text-gray-400 mb-2">
              Be very specific about the instruction and task you want the model to perform. The more descriptive and detailed the prompt is, the better the results. This is particularly important when you have a desired outcome or style of generation you are seeking. There aren't specific tokens or keywords that lead to better results. It's more important to have a good format and descriptive prompt. In fact, providing examples in the prompt is very effective to get desired output in specific formats.
            </p>
            <p className="text-gray-400 mb-2">
              When designing prompts, you should also keep in mind the length of the prompt as there are limitations regarding how long the prompt can be. Thinking about how specific and detailed you should be. Including too many unnecessary details is not necessarily a good approach. The details should be relevant and contribute to the task at hand. This is something you will need to experiment with a lot. We encourage a lot of experimentation and iteration to optimize prompts for your applications.
            </p>
            <p className="text-gray-400">As an example, let's try a simple prompt to extract specific information from a piece of text.</p>
            <pre className="bg-gray-900 p-4 rounded-md text-sm text-white mt-2">
              <code>
                Prompt:
                <br />
                Extract the name of places in the following text.
                <br />
                Desired format:
                <br />
                Place: &lt;comma_separated_list_of_places&gt;
                <br />
                Input: "Although these developments are encouraging to researchers, much is still a mystery. “We often have a black box between the brain and the effect we see in the periphery,” says Henrique Veiga-Fernandes, a neuroimmunologist at the Champalimaud Centre for the Unknown in Lisbon. “If we want to use it in the therapeutic context, we actually need to understand the mechanism.“"
                <br />
                <br />
                Output:
                <br />
                Place: Champalimaud Centre for the Unknown, Lisbon
              </code>
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-blue-400 mb-2">Avoid Impreciseness</h4>
            <p className="text-gray-400 mb-2">
              Given the tips above about being detailed and improving format, it's easy to fall into the trap of wanting to be too clever about prompts and potentially creating imprecise descriptions. It's often better to be specific and direct. The analogy here is very similar to effective communication -- the more direct, the more effective the message gets across.
            </p>
            <p className="text-gray-400 mb-2">
              For example, you might be interested in learning the concept of prompt engineering. You might try something like:
            </p>
            <pre className="bg-gray-900 p-2 rounded-md text-sm text-white italic mt-2">
              Explain the concept prompt engineering. Keep the explanation short, only a few sentences, and don't be too descriptive.
            </pre>
            <p className="text-gray-400 my-2">
              It's not clear from the prompt above how many sentences to use and what style. You might still somewhat get good responses with the above prompts but the better prompt would be one that is very specific, concise, and to the point. Something like:
            </p>
            <pre className="bg-gray-900 p-2 rounded-md text-sm text-white italic mt-2">
              Use 2-3 sentences to explain the concept of prompt engineering to a high school student.
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-blue-400 mb-2">To do or not to do?</h4>
            <p className="text-gray-400 mb-2">
              Another common tip when designing prompts is to avoid saying what not to do but say what to do instead. This encourages more specificity and focuses on the details that lead to good responses from the model.
            </p>
            <p className="text-gray-400 mb-2">
              Here is an example of a movie recommendation chatbot failing at exactly what I don't want it to do because of how I wrote the instruction -- focusing on what not to do.
            </p>
            <pre className="bg-gray-900 p-4 rounded-md text-sm text-white mt-2">
              <code>
              Prompt:
              <br />
              The following is an agent that recommends movies to a customer. DO NOT ASK FOR INTERESTS. DO NOT ASK FOR PERSONAL INFORMATION.
              <br />
              Customer: Please recommend a movie based on my interests.
              <br />
              Agent:
              <br /><br />
              Output:
              <br />
              Sure, I can recommend a movie based on your interests. What kind of movie would you like to watch? Do you prefer action, comedy, romance, or something else?
              </code>
            </pre>
            <p className="text-gray-400 my-2">Here is a better prompt:</p>
            <pre className="bg-gray-900 p-4 rounded-md text-sm text-white mt-2">
              <code>
              Prompt:
              <br />
              The following is an agent that recommends movies to a customer. The agent is responsible to recommend a movie from the top global trending movies. It should refrain from asking users for their preferences and avoid asking for personal information. If the agent doesn't have a movie to recommend, it should respond "Sorry, couldn't find a movie to recommend today.".
              <br />
              Customer: Please recommend a movie based on my interests.
              <br />
              Agent:
              <br /><br />
              Output:
              <br />
              Sorry, I don't have any information about your interests. However, here's a list of the top global trending movies right now: [list of movies]. I hope you find something you like!
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Module Wrap-up */}
      <section className="bg-blue-900/30 p-6 rounded-lg shadow-lg border border-blue-700">
        <h2 className="text-2xl font-semibold mb-3 text-white">Module 1 Complete!</h2>
        <p className="text-blue-200 mb-4">
          Congratulations! You've taken the first and most important step. You now understand what an LLM is, how to communicate with it effectively through prompting, and how to iterate on its responses to achieve your goals.
        </p>
        <p className="text-blue-200 font-semibold">
          The skills you've practiced here—assigning roles, defining tasks, providing context, and iterating—are the foundation for everything that comes next.
        </p>
      </section>



      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-1/1.2" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: The Art of the Prompt
        </Link>
        <Link 
          to="/instructions/module-2" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          On to Module 2! <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson1_3;
