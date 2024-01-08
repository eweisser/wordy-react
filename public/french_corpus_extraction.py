import re
import csv

f = open("fra_news_2022_1M-words.txt","r",encoding="utf-8")



corpus = f.read()
f.close()

# dictionary_present = {}
# dictionary_absent = {}
# list_clears_threshold = []
# list_doesnt_clear_threshold = []
# list_not_found = []

# capgroup = re.findall("\W"+word+"\W[0-9]+", corpus)
# first_extraction = re.findall("[^a-zA-ZÁÀÂÉÈÊËÍÎÏÓÔÚÙÛÜŸáàâéèêëíîïóôúùûüÿÇç]([a-zA-ZÁÀÂÉÈÊËÍÎÏÓÔÚÙÛÜŸáàâéèêëíîïóôúùûüÿÇç]{5}\W[0-9]+)", corpus)     # capital and lowercase letters
first_extraction = re.findall("[^a-zA-ZÁÀÂÉÈÊËÍÎÏÓÔÚÙÛÜŸáàâéèêëíîïóôúùûüÿÇç]([a-záàâéèêëíîïóôúùûüÿç]{5}\W[0-9]+)", corpus)     # no capitals
# first_extraction = re.findall("[^a-zA-ZÁÀÂÉÈÊËÍÎÏÓÔÚÙÛÜŸáàâéèêëíîïóôúùûüÿÇç]([a-zA-ZÁÀÂÉÈÊËÍÎÏÓÔÚÙÛÜŸáàâéèêëíîïóôúùûüÿÇç]{5}\W[0-9]+)", corpus)
        # this regex returns all matches of 5 letters followed by exactly one non-word character followed by any number of digits--where the 5 letters are preceded by a non-letter

# make_all_lowercase = []
# for entry in first_extraction:                      # an entry is something like "enero\t17"
    # make_all_lowercase.append(entry.lower())        # now all capital letters have been made lowercase; as a result, we will have duplicate entries of some words

words_with_instance_count = {}

for entry in first_extraction:
    actual_word = entry[0:5]
    instance_count = int(re.findall("[0-9]+", entry)[0])
    # print(actual_word, instance_count)
    # words_with_instance_count.append([actual_word,instance_count])
    if actual_word in words_with_instance_count:
        words_with_instance_count[actual_word] = words_with_instance_count[actual_word] + instance_count
    else:
        words_with_instance_count[actual_word] = instance_count

# print(words_with_instance_count.items())

# STILL HAVE words with repeated letters
# need to "de-accent" vowels with acute or diaresis

unaccented_dictionary_no_repeated_letters = {}

for myTuple in words_with_instance_count.items():
    original_word = myTuple[0]
    new_word = original_word.replace("á","a")
    new_word = new_word.replace("à","a")
    new_word = new_word.replace("â","a")
    new_word = new_word.replace("é","e")
    new_word = new_word.replace("í","i")
    new_word = new_word.replace("ó","o")
    new_word = new_word.replace("ú","u")
    new_word = new_word.replace("ü","u")
    include = True
    for i in range(5):
        for j in range(5):
            if new_word[i] == new_word[j] and not i == j:
                include = False
    if include:
        if new_word in unaccented_dictionary_no_repeated_letters:
            unaccented_dictionary_no_repeated_letters[new_word] = unaccented_dictionary_no_repeated_letters[new_word] + myTuple[1]
        else:
            unaccented_dictionary_no_repeated_letters[new_word] = myTuple[1]
    else:
        print(new_word)

# print(unaccented_dictionary_no_repeated_letters)

only_ten_instances_up = {}

for myTuple in unaccented_dictionary_no_repeated_letters.items():
    word = myTuple[0]
    if myTuple[1] >= 10:
        if word in only_ten_instances_up:
            only_ten_instances_up[word] = only_ten_instances_up[new_word] + myTuple[1]
        else:
            only_ten_instances_up[word] = myTuple[1]


print(only_ten_instances_up.keys())

        






# for word in LEXICON:
#     if word in corpus:
#         capgroup = re.findall("\W"+word+"\W[0-9]+", corpus)
#         if len(capgroup) > 0:
#             pass
#             if capgroup[0].startswith("\t"+word+"\t"):
#                 # print(capgroup[0])
#                 # print(word)
#                 token_count = re.findall("[0-9]+", capgroup[0])[0]
#                 if int(token_count) >= 52:
#                     # pass
#                     print(word)
#                     list_clears_threshold.append(word)
                # else:
                #     print(word)
                #     list_doesnt_clear_threshold.append(word)
                # dictionary_present[word] = token_count
            # print(dictionary_present)
        # else:
            # print(word)
            # list_doesnt_clear_threshold.append(word)
            # print(capgroup)
    # if word not in corpus:
        # print(word)
        # list_not_found.append(word)
        # list_not_found.append(word)
        # dictionary_absent[word] = 0


# print("Dictionary of words found in corpus:")
# print(dictionary_present)
# print()
# print("List of words not found in corpus:")
# print(list_not_found)
# print("List of words in corpus with 1-51 occurrences:")
# print(list_doesnt_clear_threshold)
# print("List of words in corpus with at least 52 occurrences:")
# print(list_clears_threshold)

with open('zzz.csv', 'w', newline='') as output:
    writer = csv.writer(output)
    for myTuple in only_ten_instances_up.items():
        writer.writerow(myTuple)
    # for key, value in dictionary_present.items():
        # writer.writerow([key, value])
    # for key, value in dictionary_absent.items():
        # writer.writerow([key, value])