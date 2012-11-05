import os
import os.path
import copy
import time
from sys import argv

def input():
	line_1 = raw_input("line _1 >")
	line_2 = raw_input("line _2 >")
	line_3 = raw_input("line _3 >")
	line_4 = raw_input("line _4 >")
	line_5 = raw_input("line _5 >")
	whole  = line_1+line_2+line_3+line_4+line_5
	return list(whole)

def read_dic():
	target = open('dic.txt','r')
	string = target.read()
	string_list = string.split(',')
	return string_list

def compair(dic_list,input_word,line):

	input_word.sort()
	result_list = []

	for word in dic_list:
		if (len(word) < int(line)):
			break
		else:
			letter_list = list(word)
			i = 0
			poped = []

			for letter in letter_list:

				if letter in input_word:

					poped_al = input_word.pop(input_word.index(letter))
					poped.append(poped_al)

					if i+1 == len(word):
						result_list.append(word)
					i = i + 1
				else:
					break

			for letter in poped:
				input_word.append(letter)

	return result_list	




script,line = argv
dic_list   = read_dic()
input_word = input()

starttime  = time.clock()
result_list = compair(dic_list,input_word,line)
endtime    = time.clock()

print result_list
print (endtime-starttime)




# def sort():
# 	a = ''
# 	r = 'words'



# 	for root,dirs,files in os.walk(r):
# 	    for f in files:
# 	        txt = open(root+'/'+f)
# 	        a =  txt.read()+a

# 	result = a.split('\n')
# 	after_sorted = sorted(result,key=lambda x:len(x),reverse=True)

# 	new_line = ''
# 	for word in after_sorted:
# 		word = word + ','
# 		new_line = new_line+ word
		

# 	target = open('dic.txt','w')
# 	target.write(new_line)
# 	print 'ok!\n'