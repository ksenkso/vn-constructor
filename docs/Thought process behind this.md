# The though process behind this

Here I am probing my skills of technical writing in english and also explaining why everything works as it does. You should not expect this text to be properly constructed: there will be mistakes, grammatical and logical (I am learning from them, so it's ok). And i from now on will be using less strict rules for english (less capital letters at least).

Now, lets talk about the editor. I really want to decide  how it should be implemented, but first i have to decide what features it needs to have. To do so, lets first limit its responsibility to something definitive.

## Responsibility of the graph editor

I really like thinking in terms of responsibility of components in a system. It gives you a starting point, from which you can move on to the details: how it should be done, what it needs to do its job, where are the problems might be hiding. So we start with that.

I see the responsibility of the graph editor as giving a user an ability to manipulate the flow of the game. But on second thought, it serves as a navigation tool. So there are already two responsibilities. Lets decouple them.

### What is a graph editor?

For shortness, i'll be calling the graph editor the GE, i think it makes sense. So, GE has two (or maybe more) responsibilities because it doesn't. What i wrote earlier are responsibilities of things that the GE consists of. Therefore, i was wrong about its responsibility. Its responsibility is actually just providing the view for those things. And the view is a graph, and the graph has its rules of rendering and this is what th GE is all really about. Serving as navigation or control flow instrument isn't really its job - it just provides the tools for it. So the conclusion about the GE's responsibility is that it's providing other components inside it the tools to their job in a form of an interactive graph.

That's a good thing i found that, i think. Because if i didn't, i would've start implementing the logic of navigation and changing the state of the outer part of the app from inside the GE itself. And that would've created a mess inside this component (or a bunch of components, i didn't implement it at the time of writing this).

But we still have those two responsibilities that we found first. We should assign them to components inside the GE, so it is all settled with them.

First, the responsibility of navigation inside the story is handled by the graph nodes and edges. But we have to define navigation first.

Our stories consist of nodes and edges between them. Nodes define what happens, edges define possible routes between "what happens". Generally, navigation is a process of getting from one state to the other through some route. In our case, navigation in the editor is a process of viewing different components of the story. Those components are nodes and edges. We view those components in a special view, that is outside of the scope of this topic, but we have it, and it is outside the GE. So the navigation is actually changing the viewed object from one graph component to another through sending a new one to the view from the GE. The rout can be different: local state of the page passed through props, redux store, context value. But the main thing is that we can change it with the functionality that GE provides.

## How do you work with GE?

There is a lot of questions about how should we do this or that operation on a story graph. I will cover them in a random order and then reorder, so it's more easy to read.

Let's start with this: **how do I connect one node to another?**

First, you will need two nodes. You can add a node with right-click in empty space in GE, opening a context menu. Then select "Create node" -> "Create <type> node", where `type` is one of `common`, `choice`, `router`, `ending`. There also will be a keyboard shortcut for this, but for now we'll use mouse. You can create two nodes this way. When a node is created, it won't have a sequence.
You should drag an edge from one of the out points of the source node to the in point of the target node.

Oh, another cool feature - highlight sequence of a selected node. This will definitely be useful. Just hit `CMD+H` and all nodes and edges between them will be highlighted.
