import os
import os.path
import time
from sys import argv

def read_dic():
	target = open('dict.txt','r')
	string = target.read()
	return string.split(',')

def compair(dic_list,input_word,line):

	result_list = []

	for word in dic_list:
		if (len(word) < int(line)):
			break
		else:
			letter_list = list(word)
			counter = 0
			poped = []

			for letter in letter_list:
				if letter in input_word:
					poped_al = input_word.pop(input_word.index(letter))
					poped.append(poped_al)

					if counter+1 == len(word):
						result_list.append(word)
					counter = counter + 1

				else:
					break
			for letter in poped:
				input_word.append(letter)

	return result_list	

starttime   = time.clock()

script,line,string_25 = argv

dic_list    = read_dic()
input_word  = list(string_25)
result_list = compair(dic_list,input_word,line)

endtime     = time.clock()

print result_list
print 'Time cost: '+str(endtime-starttime)