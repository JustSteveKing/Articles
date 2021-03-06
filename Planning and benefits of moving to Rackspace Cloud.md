So the buzz word inside most IT companies offices right now is the “Cloud”. With the amount people talk about it you
would think it is brand new technology and a real game changer! However, when you put it in layman’s terms, it’s simply
a mechanism to let the average Joe (you or me) have access to an area on a Hyper-Visor so they can spin up what they
now call “instances” which some of us would know as a Virtual Machine.

I am not saying that this is all a load of hype about nothing, quite the opposite in fact. This is a great step
forward for the SMB (Small to Medium Business) market as there can be no more reliance on in-house System
Administrators and such. The ability to spin up a web/application server at the drop of a hat as and when
required is something the web world definitely needed.

Now let me take a scenario out for you; Imagine you are running a small-medium sized e-commerce shop, you have a
promotion coming up soon and you are already on a Cloud account. This promotion is undoubtedly going to increase
any inbound traffic to your site, right? Well with a Cloud account like the one I am currently working on
with [Rackspace](http://www.rackspace.co.uk), I can just spin up a new Instance (VM) all behind my Load Balancer
and boom-it works! No downtime whatsoever! Perfect really.

Now imagine my promotion is coming to its close and traffic is slowly dying back down to a reasonable level for my
original Instance to handle, I simple close down the replicated VM and back to normal operations. THIS is what I
love about the Cloud.

Do not get me wrong, I am not suggesting everybody jump ship and move to the cloud right away, it has got to make
good sense to you and your business to make that jump. Otherwise what is the point really? A lot of companies are
looking more into what they class as the “Hybrid Cloud” – basically a mixture of hardware and a cloud platform.
This is what I am currently planning, as it offers me exactly what I need. Throughout the rest of my rambling here
I will explain my plan (in not too much detail) and why this solution is great in a hosting environment.

Ok, so at the moment the company I work for has the traditional layout of servers: firewall, web server, and
database server. Pretty typical right? Moving forward and having more control we started looking towards the Cloud.
After enough digging, I realised a hybrid solution would be a much better alternative. So let us begin the journey
to my Cloud solution and my thought processes along the way.

First of all, we had to deal with the levels of client which we currently have. In all environments like this you
have the important but not as important clients. There are the sort of sites that are 4-5 pages and get probably
about 50 visits a day, mainly from the owners making sure their site is up. Now this sort of site you can quite
easily bundle into a nice shared platform, for this I would split 15 websites all onto a nice 4Gb server. So that
bit was handled, and should they start to get busier it is a simple case of assigning more resources.

Now to the websites that would require a little more attention in the planning. With Rackspace, currently I am not
able to have a physical firewall pointing straight at my Cloud as I am on Public Cloud. Which is no real biggie as
the Public Cloud network is handled by Rackspace themselves, so I can be happy that some level of security precautions
are in place. So what do I do with my Dedicated Firewall? Simple. Move this from the first point on the
network (incoming traffic) and slip it between the Cloud Instances and Database. The need for a Firewall before the
web server is sometimes over used, a well configured Linux install using SELinux and IP tables is all you really
need in my scenario.

The first point of call has been changed, we now hit the relevant Load Balancer for the website we are trying to
access. This will control the networking, and give me that bonus of spinning up a new Instance should I need it.
Perfect! So the only thing I need to worry about is creating a secure workable VM image to work with every time.
At the moment I am in the Cloud, rented hardware. This is where I share the maximum resources available between
whoever my neighbors are. This would be a problem if I had not already planned for this. The only operations going on
here are web files, everything that makes the magic happen to Jimmy the ‘user’.

To keep costs down here I am taking advantage of what Rackspace call Cloud Files. This is basically a
CDN (Content Delivery Network), which works out cheaper than physical hard disk space, perfect! The majority of
disk space used on your average website is always going to be images. Save yourself some money, spend a little bit
of time configuring your site so it pulls from the CDN. This way your site will load faster, Google will love you for
it and you’re saving money. A real no-brainer.

So I have talked about the Cloud side, where I have my Load Balancer as my first point of contact. This talks
to the Cloud instance where my web files are sitting, which in turn tells the CDN to deliver its content. The only
thing left in this is my database, really. Now this could go either way. Do I go for a Cloud Instance for a
database or stick with actual hardware. Well with the firewall being the next logical
point-of-call (as it is nice to have one sometimes), I opted for a hardware database server-Hence the Hybrid
Cloud I have been rambling on about.

My choice to go for a dedicated server for the database was simple. With a MySQL Instance in the Cloud I am sharing
the Disk I/O (read and write) with whoever else is on my Hyper-Visor. Now if my sites were pretty slow and static
sites, I wouldn’t mind too much. However with e-commerce sites you need that data and you need it fast! That was my
reasoning behind the physical box. Plus, I can control a lot more of what goes on with this box that I could with
the Cloud as I am only technically renting space.

That completes my plan for architecture, with maybe a few reasons for my choices thrown in. To me this plan was
a little bit of a no-brainer, but I know servers, I know Rackspace and I know OpenStack (the Cloud platform used).
Others may not be so lucky, but in my next article I will be going into this is more technical detail.
How things work, best practices etc. I could talk about this for days, but I don’t think my Editor would be
happy with that one! For now I leave it at a draw. A little information, a bit of a thought process. Also a
kick in the right direction. If you aren’t moving, why not? With my plan, the company I am working for are
actually going to save money. Maybe you could too!
