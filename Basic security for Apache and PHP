So yet again I am back writing about Security, for some reason it appears to be my topic of the month! It 
constantly astounds me how little people take security seriously, and what their concept of security actually is. 
I have worked with quite a few web developers in my time and they all seemed to think that Web Security starts 
with their application! There is a whole other layer before that guys – it is called a server! So to carry on from a 
previous article about securing CentOS I am back to carry this on with the next level – Apache and PHP. You might 
ask why I concentrate my tutorials on CentOS when there are other distributions available, simple answer – I own 
a CentOS server. All of my tutorials are carried out on my server so I can make sure that the commands work 
properly and so that I can make sure no problems are encountered by doing these steps. As usual these are just 
best practices from my experience!

Ok so to kick us off let us talk about Apache, have you ever been to a directory on a website for 
example: http:/domain.tdl/css and had a big list of files or sub-directories thrown at you? This is 
not “technically” a vulnerability however it is a big fat cross in the box if you are trying to become PCI compliant. 
Sometimes if a little configuration has been done you will get the typical 403 – Access Denied message. 
BUT this page will also provide information to an attacker on your system. For example the version of Apache you 
are currently running, and on which Operating System. This may not sound like a lot to you, however all it takes 
is a little patience and some “Google Fu” to find known exploits of your apache version.

So let us start getting this fixed shall we? To start with I will get rid of the Apache version and any Operating 
System print outs that someone may be able to get hold of. We do this quite simple by telling Apache not to 
show this:

    # Open the config file in your editor
    vim /etc/httpd/conf/http.conf
    # Change the following settings to reflect this
    ServerSignature Off
    ServerTokens Prod
    # Now restart Apache
    service httpd restart

That is all you need to do! To test this I will show you a quick easy way to grab the headers from your webpage. 
I will use my own website as an example:

    curl -I http://thedevshed.co.uk/index.php

Now I know I have this file on my server, however with this CURL command I am simply grabbing the server response 
information and printing it out. This is what my output now looks like:

    HTTP/1.1 200 OK
    Date: Wed, 19 Jun 2014 12:44:24 GMT
    Server: Apache
    Vary: Accept-Encoding
    Cache-Control: max-age=0, no-cache
    Connection: close
    Content-Type: text/html; charset=UTF-8

What you will notice here is that yes it still does display the fact that I am using Apache, but I am not worried 
about this.

So now for a slight detour from the main Apache configuration, and to go to my sites configuration file and make 
a few changes. This is where I want to control access to my site more directly, using the various options available 
to me. I have nothing special set up on my server for security other than configuring everything properly.

    <Directory />
        Order Deny,Allow
        Deny from all
        Options None
        AllowOverride None
    </Directory>
    <Direcotry /var/www/html>
        Order Allow,Deny
        Allow from all
        Options -Indexes -Includes -ExecCGI -FollowSymLinks
    </Directory>

Ok so what I am doing here is simply adding rules in my site config file for now only the directory my website 
sits in, but also all other directories Apache may have access to. Now one thing I will point out that I mentioned 
earlier is the “Options -Indexes” statement in my website Directory statement. This is what I mentioned before about 
displaying a list of files within a URL – a nice simple rule to add and this gets rid of that.

Now from a basic level that is all we really need to do with Apache itself, you can do a lot more but from a basic 
point of view we have tidied up and hidden certain elements which we would not like to be disclosed so easily. 
From here we want to move onto our PHP configuration, something a little trickier and usually needs doing case 
by case for a website. However I will go over my configuration for my website again as this is what I used to 
test. So first off we need to change a few rules within our php.ini file:

    # Open up your php.ini file
    vim /etc/php/ini
    # Change the following rules
    display_errors=Off
    expose_php=Off
    allow_url_fopen=Off
    allow_url_include=Off
    sql.safe_mode=On
    magic_quotes_gpc=Off

Now I will explain what we have done. We do not want to server our attackers any error messages from the server, 
this will give them insight into how our server works and how to make it throw a fit. We also have “expose_php=Off” 
basically what we are doing here is telling our server now to give information on what version of PHP we may 
be using. Like the Apache version information this gives an attacker more information than what you want to.
The next two on my list “allow_url_fopen” and “allow_url_include” being set to off, this is simply because you 
do not want anyone to be able to exploit any code on your website to open a file or include another file. It 
is really as simple as that. Otherwise we could quite easily fopen you database configuration file and get 
access details, or include our own script to be executed.

Moving on from standard PHP settings I like to create my own security file in PHP so I can organise and review 
my practices every now and then, also it makes for better house cleaning for myself. So lets create a security 
configuration file and add a few rules:

    # Create and open the file
    vim /etc/php.d/security.ini
    # And let us add some rules
    max_execution_time =  30
    max_input_time = 30
    memory_limit = 8M
    disable_functions=exec, passthru, shell_exec, system, proc_open, popen, curl_exec, curl_multi_exec, parse_ini_file, show_source
    # Enable cgi.force_redirect for security reasons in a typical *Apache+PHP-CGI/FastCGI* setup
    cgi.force_redirect=On
    open_basedir="/var/www/html/"

What we are doing here is tightening up anything that PHP by default is allowed to do. Alot of this is fairly self 
explanitory so I won't go into it too much – if your not sure you probably aren't using it on your application. 
Here we are lowering the default execution and input timings and lowering the memory limit, also we are disabling 
some inbuilt PHP functions which we should never leave open on a public facing website. Also here we define our 
base directory for our application so that nothing can be passed back past our web directory.

That is it for editing configuration files! With this set up you can safely assume everything will be locked 
down to a reasonable level on your server. To go one step further however we can use an inbuilt Linux command 
called chattr. What this command does it locks the file for writing, so if the worst does happen files cannot 
easily be written to. It can however be a pain if you forget you are using it! You open the file start making 
changes as root user, then try to save to configuration forgetting that you cant and have to start again. 
So if you are forgetful do not use this, otherwise you will get really frustrated!

    chattr +i /etc/php.ini
    chattr +i /etc/php.d/*
    chattr +i /etc/httpd/conf/httpd.conf
    chattr +i /etc/

So what we have done here is told chattr with the +i to lock these files so even root user cannot edit them. 
To unlock them we simply run the command with a -i instead of a +i which should be simple to remember! You 
can even do this with files in your website, as long as your system does not need write access to them.

Now another tool I like to run on my server once I have finished these steps is a nice utility a little like 
your phpinfo() class, it is the phpSecInfo. You can find the website here 
[PHPSECINFO](http://phpsec.org/projects/phpsecinfo/index.html). Once downloaded to your server simply navigate 
to the downloaded directory and review the settings and recommendations.
