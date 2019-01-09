#!/usr/local/bin/python3

import os
import re
import sys
import markdown
from datetime import date,datetime

# 检查的结果
output_str=""

# 检查规则
rules=[
        r".*console",
    ]

igrules=[
    r"\.DS_Store"
]
file_exts=[
    r".*\.vue",
    r".*\.js",
]
def check_line(line,number=0):
    global output_str
    for rule in rules:
        result = re.match(rule, line)

        if(result):
            output_str=output_str+"- line:"+str(number)+",text:"+result.string

def check_file(filename):
    global output_str
    number=0
    output_str=output_str+os.linesep+"---"+os.linesep+"## 文件:"+filename+os.linesep

    with open(filename) as fp:
        for line in iter(fp.readline, ''):
            number=number+1
            check_line(line,number)

def walkfiles(dirname):
    for cur, _dirs, files in os.walk(dirname):
        head, tail = os.path.split(cur)

        for f in files:
            print(cur+os.sep+f)

# 遍历目录下所有的文件。
def rerDir(dirname):
    for cur, _dirs, files in os.walk(dirname):
        head, tail = os.path.split(cur)

        for f in files:
            filename=cur+os.sep+f

            # @todo 忽略文件
            for rule in igrules:
                match =re.match(rule,f)
                if match:
                    pass
                else:
                    for ext_rule in file_exts:
                        ext_mat =re.match(ext_rule,f)
                        if ext_mat:
                            check_file(filename)


def get_title():
    s=datetime.today()
    time=s.strftime("%Y-%m-%d %H:%M:%S")
    title="# 检测结果 :"+time + os.linesep
    return title

# 检查结果写入到md文档
def write_output(output_path):
    title=get_title()
    with  open(output_path+os.sep+"index.md","w") as fd:
        fd.write(title+output_str)

# 检查结果写入到html文档
def write_output_html(output_path):
    title=get_title()
    with  open(output_path+os.sep+"index.html","w") as fd:
        htmlcontent = markdown.markdown(title+output_str)

        html="""<!DOCTYPE html>
            <html>
            <head>
                <title>检测结果</title>
            </head>
            <body>
            %(content)s
            </body>
            </html>
            """%{'content':htmlcontent}
        fd.write(html)

def run():
    input_dir="./src"
    # 输出目录
    output_path=".output"
    if os.path.isdir(output_path):
        pass
    else:
        os.mkdir(".output")

    if len(sys.argv)>1:
       input_dir= sys.argv[1]
    
    rerDir(input_dir)

    write_output(output_path)
    write_output_html(output_path)

    print("done")

# 入口
run()


