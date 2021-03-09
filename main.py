from pulp import *

print('数独入力：')
sudoku_text = input()

prob = LpProblem(name='sudoku', sense=LpMinimize)

num = range(9)
row = range(9)
line = range(9)
X = LpVariable.dicts('X', (row, line, num), 0, 1, LpInteger)

for pos, char in enumerate(sudoku_text):
  pos_i = pos // 9
  pos_j = pos % 9
  sudoku_n = int(char)
  if sudoku_n != 0:
    prob += X[pos_i][pos_j][int(char)-1] == 1

prob += 1 # 目的関数
# 各マスには1~9の数字しか入らない
for i in row:
  for j in line:
    prob += lpSum([X[i][j][n] for n in num]) == 1
# 各行には1~9の数字がかぶりなく入る
for j in line:
  for n in num:
    prob += lpSum([X[i][j][n] for i in row]) == 1
# 各列には1~9の数字がかぶりなく入る
for i in row:
  for n in num:
    prob += lpSum([X[i][j][n] for j in line]) == 1
# 各3×3ブロックには1~9の数字がかぶりなく入る
for offset_i in [0, 3, 6]:
  for offset_j in [0, 3, 6]:
    for n in num:
      prob += lpSum([X[offset_i+i][offset_j+j][n] for i in range(3) for j in range(3)]) == 1

prob_list = [prob]

for prob in prob_list:
  print('==========')
  print(prob) # 問題を出力

  prob.solve() # 求解#結果を表示
  print(LpStatus[prob.status])
  print('Optimal valu = ', value(prob.objective))
  for i, v in enumerate(prob.variables()):
    if value(v) == 1:
      print(int(v.name.split('_')[-1])+1, end='')