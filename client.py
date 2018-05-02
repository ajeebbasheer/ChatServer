#/usr/bin/env python
import socket
import select
import string
import sys

def prompt() :
	sys.stdout.write('<ME>:: ')
	sys.stdout.flush()
	
if(len(sys.argv) < 3) :
	print 'Usage : python client.py hostname port'
	sys.exit()
host=sys.argv[1]
port=int(sys.argv[2])

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.settimeout(2)

try:
	sock.connect((host,port))
except:
	print "connection failed,try again.."
	sys.exit()

print "connected to remote host,start sending messages...."
prompt()

while 1:
	sock_list= [sys.stdin,sock]
	read_sockets, write_sockets, error_sockets = select.select(sock_list , [], [])
	for s in read_sockets:
		if s==sock:
			data=s.recv(4096)
			if not data:
				print "disconnected from chat server"
				sys.exit()
			else:
				sys.stdout.write(data)
				prompt()
		else:
			msg=sys.stdin.readline()
			sock.send(msg)
			prompt()
	
