input = [int(j) for j in list(open('day_9/input.txt', 'r').read())]

st = []
p = []

for i in range(0, len(input), 1):
    c = input[i]

    if i % 2 == 0:
        p.append(len(st))
        for _ in range(c):
            st.append(i // 2)
    else:
        for _ in range(c):
            st.append(-1)

for j in range(len(input) - 1, -1, -2):
    i = -1
    for k in range(len(st)):
        if st[k] == -1 and k+input[j] < len(st):
            no = True
            for f in st[k:(k+input[j])]:
                if f != -1:
                    no = False
                    break
            
            if no:
                i = k
                break

    if i == -1 or i > p[j // 2]:
        continue

    for k in range(p[j // 2], p[j // 2] + input[j]):
        st[k] = -1
    
    for k in range(input[j]):
        st[k + i] = (j // 2)

v = 0
for j in range(len(st)):
    if st[j] != -1:
        v += j * st[j]

print(v)