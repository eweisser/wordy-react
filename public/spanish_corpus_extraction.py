import re
import csv

f = open("spa_news_2022_1M-words.txt","r",encoding="utf-8")



corpus = f.read()
f.close()

# dictionary_present = {}
# dictionary_absent = {}
# list_clears_threshold = []
# list_doesnt_clear_threshold = []
# list_not_found = []

# capgroup = re.findall("\W"+word+"\W[0-9]+", corpus)
found_with_multiples = re.findall("[^a-zA-ZÁÉÍÓÚÜáéíóúüÑñ]([a-zA-ZÁÉÍÓÚÜáéíóúüÑñ]{5})[^a-zA-ZÁáñÁÉÍÓÚÜáéíóúüÑñ]", corpus)
# print(found_with_multiples)

found_no_multiples = []

for entry in found_with_multiples:
    if entry not in found_no_multiples:
        found_no_multiples.append(entry)

print(found_no_multiples)


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

with open('zzz.csv', 'w') as output:
    writer = csv.writer(output)
    for word in found_no_multiples:
        writer.writerow(word)
    # for key, value in dictionary_present.items():
        # writer.writerow([key, value])
    # for key, value in dictionary_absent.items():
        # writer.writerow([key, value])