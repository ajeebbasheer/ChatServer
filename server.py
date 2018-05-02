#/usr/bin/env python
import socket
import sys
import select

CONNECTION_LIST=[]
RECV_BUFFER=4096
PORT=5000


def broadcast(sock,message):
	for s in CONNECTION_LIST:
		if s != server_socket and socket!=sock:
			try:
				s.send(message)
			except:
				s.close()
				CONNECTION_LIST.remove(socket)
				
server_socket=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
server_socket.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1)
server_socket.bind(("localhost", PORT))
server_socket.listen(10)

CONNECTION_LIST.append(server_socket)
print "Chat server started on port " + str(PORT)
while 1:
	read_sockets,write_sockets,error_sockets = select.select(CONNECTION_LIST,[],[])
	for sock in read_sockets:
		if sock==server_socket:
			sockfd, addr = server_socket.accept()
			CONNECTION_LIST.append(sockfd)
			print "client (%s,%s) is connected" %addr
			broadcast(sockfd,"[%s:%s] entered room\n" %addr)
		else:
			try:
				data=sock.recv(RECV_BUFFER)
				if data:
					broadcast(sock, "\r" + 'machan::<' + str(sock.getpeername()) + '> ::' + data)
			except:
				broadcast(sock, "client(%s,%s) is offline" %addr)
				print "client(%s,%s) is offline " %addr
				server_socket.close()
				CONNECTION_LIST.remove(sock)
				continue

	
server_socket.close()
