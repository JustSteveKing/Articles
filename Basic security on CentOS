So at the moment I am running through my usual steps before deploying any new kind of infrastructure. I have planned 
out how everything is going to work, so next is my favourite part – security! 
In this article I am going to run through a few of the basic level security fixes you can add to your CentOS box. 
Some of these will apply others not so much, as if it is a VPS your OS template has already been created for you. 
These are not by any means all you need to do, these are just some practices that I like to run through.

Ok so first things first, lets kick off this tutorial with some simple TCP wrappers. TCP wrappers provide a simple 
way to controll access to applications such as SSH. Ok what we want is a blank slate to start with - security 
proceedures should never be assumed for us. So lets make sure out hosts.deny file is blank:

    cat /dev/null > /etc/hosts.deny

Perfect, we now have an empty hosts.deny file to work with. This in my opinion is always the best way to use 
this file, do not deny services always ALLOW services. So what we do from our command line is simple tell this 
file to deny all from all:

    echo "ALL:ALL" >> /etc/hosts.deny

Right now we have sorted that out, we can start working on our hosts.allow file. As before we want to make sure 
this is blank so nothing can be assumed. As before we just need to run the simple cat /dev/null command but 
into the allow file like so:

    cat /dev/null > /etc/hosts.allow

If you do not know what this command does, I will quickly explain. We are simply over writing the file with blank 
empty data.

Ok, now lets allow SSH incase we get disconnected for some reason!

    echo “sshd:ALL” >> /etc/hosts.allow

There. Now the only connection mechanism we have to our server is via SSH, we can of course add the ones which we 
want to add in here. For example FTP may be required? However I prefer the SCP command personally. As a base level 
unless absolutely required I would stick with just SSH and FTP if really needed. You can go into this even deeper 
however as a base level security there is no real need. Let me take a moment to explain what we have been inserting 
into these files. The structure ALL:ALL or sshd:ALL is simple to explain, it is basically SERVICE:HOST so if 
you had a static IP you only ever wanted to connect to via SSH then we would do this sshd:xxx.xxx.xxx.xxx and 
that is all.

Now lets move away from blocking services and allowing services as this is simple stuff. Now I am going to move on 
iptables. Yet again this is a relatively simple thing to do and as someone who frequently spins up servers it is 
second nature. For this however you will need to know a little about networking, mainly what ports are used 
for what. I would suggest installing a tool called nmap so you can see what ports are open really quickly and 
easily. One of the best tutorials I have ever read on this is from the CentOS documentation themselves. For 
this part I am simply going to show you a bash script with comments, and explain in a little more details at 
the end. Please note these commands in the script are able to be ran on their own.

    #!/bin/bash
    # First off we want to flush all rules from out iptables
	  iptables -F
	  # Start with allowing SSH incase our session gets killed for some reason
	  iptables -A INPUT -p TCP --dport 22 -j ACCEPT
	  # Set our default policies for any chains
	  iptables -P  INPUT DROP
	  iptables -P FORWARD DROP
	  iptables -P OUTPUT ACCEPT
	  # Allow all access on localhost
	  iptables -A INPUT -i lo -j ACCEPT
	  # Accept packets that belong to established and related connections.
	  iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
	  # Then we can filter services that we either use or do not use for this example
	  # I am going to assume you want to send but not receive emails. Also that you are
	  # running http only without any SSL connection.
	  iptables -A INPUT -p TCP --dport 110 -j REJECT
	  iptables -A INPUT -p TCP --dport 143 -j REJECT
	  iptables -A INPUT -p TCP --dport 25 -j ACCEPT
	  iptables -A INPUT -p TCP --dport 587 -j ACCEPT
	  iptables -A INPUT -p TCP --dport 80 -j ACCEPT
	  iptables -A INPUT -p TCP --dport 443 -j REJECT
	  iptables -A INPUT -p TCP --dport 21 -j ACCEPT
	  # We then need to make sure that we save our settings!!!
	  /sbin/service iptables save
	  # If you want to review your rules we can print these out with
	  iptables -L -v

This is of course a very simple setup of iptables. All we are doing above is flushing preset rules to start from 
scratch, setting up our default policies, then allowing or rejecting connections. Now I could debate about 
having both ports 25 and 587 open for SMTP traffic – this is entirely up to you. This is the kind of configuration 
that I would use on a relatively simple static web server that has a contact for, but nothing that needs encryption.

If you do not need access to something like phpMyadmin then you might also wish to block off the default MySQL 
port with:

    iptables -A INPUT -p TCP –dport 3306 -j REJECT

Now we have secured what services are publically(or privately) accesible on our server, also which ports we are 
going to allow connections on. We could quite easily leave it here and be happy in the knowledge that we are more 
secure than standard. However I would never leave it at this and go that extra mile. If like me and your server is 
your pride and joy (maybe time to get a girlfriend) then I am sure you will hang in there and follow me through the 
rest of this.

Now onto SELinux, some people use it and others do not. Depending on your setup depends on what you will want 
to do. For this example I am going to use it, because quite simply it is there so I may as well! SELinux 
has 3 modes:

	1. Disabled – a little obvious what this one is.
	2. Permissive – This is a troubleshooting level, it will not enforce any policies.
	3. Enforcing – This is the highest level, and the one I would recommend.

By default this is generally set to “permissive” on a fresh install. So now I will tell you how to change this
to the highest level.

This will open up the configuration file in an editor, I prefer vim to vi or others. What you will then see is 
the following:

	# This file controls the state of SELinux on the system.
	# SELINUX= can take one of these three values:
	#       enforcing - SELinux security policy is enforced.
	#       permissive - SELinux prints warnings instead of enforcing.
	#       disabled - SELinux is fully disabled.
	SELINUX=permissive
	# SELINUXTYPE= type of policy in use. Possible values are:
	#       targeted - Only targeted network daemons are protected.
	#       strict - Full SELinux protection.
	SELINUXTYPE=targeted

What you are looking to edit here is where it says SELINUX=permissive. We change this rule to enforcing, also 
we can change the type to strict if we need to. At this point unfortunately we need to reboot out machine for 
the system to reload the configurations. But that is all you need to do on a basic level for SELinux!

Ok so now we have covered a few general topics about iptables, SELinux and application accessibility. I am going 
to take a brief detour now and talk about Physical Security, because believe it or not there is something you 
can do about that too!

When working as a System Admin for a hosting company, if we ever lost a password – or it got changed and someone 
didn't tell us (happens way too much!) I used to sign in the quick and dirty way. The trick to this was 
rebooting the server, when grub is loading you want to edit to profile you are booting into. The very last number 
on the profile is its ID, we change this number (whatever it is) to a zero and away we go! We are now in the server 
with root privileges! Not great for security, but a useful tool for sysadmins with bad memories! How do we 
protect this?? Well if someone is trying to attack your server and they have physical access to it then 
it is pretty much game over. However you can make them jump through a few hoops at least! So what we do is the 
following:

    echo “# Require the root pw when booting in single user mode” >> /etc/inittab
    echo “~~:S:wait:/sbin/sulogin” >> /etc/inittab
    echo “Don't allow any nut to kill the server” >> /etc/inittab
    perl -npe 's/ca::ctrlaltdel:\/sbin\/shutdown/#ca::ctrlaltdel:\/sbin\/shutdown/' -i /etc/inittab

What we are doing here is just adding a few amendments to the standard inittab file so that if someone has access 
to the server, and is trying to reboot into single user mode then we trap the keys to stop them doing so. 
They can try and try to reboot, but we are stopping them from doing so. However this does not stop them 
“pulling the plug” so to speak. This if you have the right server notifications on then you should be able to ssh 
into your box and kill the session they are logged in with.

Ok after that brief detour into Physical security lets get back to the system level. There a few smaller things 
we can do to tidy up the security at the OS level like restricting root. The bonus of this is that most 
automated software/wannabe hacker is going to dive straight at your server wanting to log in as root to 
claim his prize in hackerdom for breaking into a server that hosts a kitten website. Well done my friend 
I may as well leave a welcome matt down for you because I didn't limit login attempts and I allow logging in 
with root...

Now lets move onto users and SSH! Ok first off we want to add a new user and give them a password, I will NOT 
assume you can do this so I am going to create a user called steve:

    useradd steve
    passwd steve

Ok we have created the user steve and given them a password, now all we need to do is add them as a super 
user and let this user be the only one to be able to log in as root. We do this with the following:

    usermod -G wheel steve

Then we need to open up the follow following file in out text editor:

    vim /etc/pam.d/su

What we are looking to uncomment in this file is the following:

    auth            required        pam_wheel.so use_uid

What we are doing here is telling the system to only allow the user steve to login as root. I would highly 
recommend using a more secure login name and one that cant be guessed though! Ok so if steve is the only one 
able to login as root and we want to stop root logging in, we need to make sure that steve has the same 
privileges as root:

    visudo
    # Add the following line to the correct place in the file
    steve ALL=(ALL) ALL

Ok so now steve is the only person who can login as root, but also has root privileges! We have a choice here 
depending on how you set your system up, we can forward all emails that would go to root to the new user, steve 
in this case, by doing the following:

    vi /etc/aliases

Then uncomment the root alias and add the user:

    root:	steve

Ok so now we have the right user setup and everything is in order we move onto securing OpenSSH and stopping those 
pesky root logins! First off lets disable any root logins:

    vim /etc/ssh/sshd_config
    # Prevent root logins
    PermitRootLogin no

It is as simple as change from yes to no, but most people skip this step. Now we just need to add a user that is 
allowed to login through SSH:

    vim /etc/ssh/sshd_config
    AllowUsers steve

Now we want to change the protocol that we use for SSH, the default is protocol 1 – and older less secure version. 
So we will change this to protocol 2:

    vim /etc/ssh/sshd_config
    # Protocol 2,1
    Protocol 2

Perfect, we have stopped root logins, and added out user to the allowed users list! All we need to do to finish 
up this step is restart the SSH service with:
	
    service sshd restart

Job done! We are now sitting in quite a nice secure system. Now remember what we did with the iptables and inputting 
new restrictions and allowing certain ports? Let us return to that for a moment and add another set of rules to 
help with securing SSH:

    iptables -A INPUT -p TCP --dport 22 -m state NEW -m recent --set --name ssh --rsource
    iptables -A INPUT -p TCP --dport 22 -m state --state NEW -m recent ! --rcheck --seconds 60 --hitcount 4 --name ssh --rsource -j ACCEPT

Ok so what we just did here is input another iptables rule for SSH. To sumarise this what we are telling iptables 
to do is for each new connection check it hasn't tried to connect more than 4 times in the last 60 seconds. 
These numbers can of course be changed, as these are just numbers I use.

There are of course many techniques you can use to help secure your pride and joy server, this article is merely 
brushing the surface. I do not claim to be a security expert of any kind, this is just what I have learnt 
from reading documentation carefully and what I have learnt from practice. The best thing you can use to secure 
your server is common sense. Believe it or not but most hackers who might be trying to get into your server 
will not be like a mad man wielding an ax trying to get inside. They will be calm collected and use common sense. 
So use some yourself, and think how you would break in.

I hope you enjoyed reading this tutorial/article and that it helps you in someway or another, I welcome feedback! 
Feel free to drop comments to me on twitter @JustSteveKing :)
