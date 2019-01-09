#!/bin/bash

# desc: 该脚本用于一键构建m.ngmm365.com的线上代码，并自动提交到远程git仓库
# author: zhuwang<zhuwang@nicomama.com>
# date: 2018年 6月15日 星期五 19时48分06秒 CST


# 初始化上下文。有参数的
initContext(){
	# （webpack打包后的）源代码目录
	source_dir=dist

	# 为app内嵌版本打包的参数
	if [ $# -gt 0 ] && [ $1 = 'beta' ];then
		# 生产代码远程仓库地址，
		git_url=git@git.ngmm365.com:page_packages/distributionc-m-beta-dist.git

		# 生产代码本地根目录
		dest=".deploy/beta"

		# npm 的脚本名次
		node_script=build_beta
	else
		# 生产代码远程仓库地址
		git_url=git@git.ngmm365.com:page_packages/distributionc-m-dist.git
		
		# 生产代码本地根目录
		dest=".deploy/pro"

		# npm 的脚本名次
		node_script=build_pro
	fi
}

# 初始化git目录，pull最新代码
init(){
	echo +++init start;
	
	if [ ! -d $dest ]; then
	  	git clone $git_url $dest
	fi

	# 记录现在的目录位置，最后要回来的
	cur=`pwd`

  	# 进入git目录
  	cd $dest
  	
  	# git checkout .
  	git add .
  	git stash

  	# reset为线上最新版本，要先pull一下再reset。
  	git pull origin master
  	git reset --hard origin/master
		
	# 然后再pull一下
	git pull origin master

	# 回到原来的目录
	cd $cur
	echo ---init end;
}

# 重置dist目录
resetDist(){
	echo +++resetDist start

	rsync -a --delete --exclude='.git' $dest/. ./dist

	echo ---resetDist end
}

# 构建
build(){
	echo +++build start
	npm run $node_script
	echo ---build end
}

# 检查是否成功
checkBuild(){	
	if [[ ! -f $source_dir/index.html || ! -d $source_dir/static ]]; then
		echo error
	else
		echo ok
	fi
}

# 复制代码到$dest目录
cpCode(){
	echo +++cpCode start
	# 复制代码，所有文件包含隐藏文件
	rsync -r --delete --exclude='.git'  $source_dir/. $dest

	echo ---cpCode end
}

# 提交到远程git仓库
commit(){
	echo +++commit start
	# 记录现在的目录位置，最后要回来的
	cur=`pwd`

	# 进入git目录
	cd $dest
	# 提交的字符串
	commit_str="commited in `date '+%Y-%m-%d_%H:%M:%S'`"
	
	git add .
	git commit -am "${commit_str}"
	git push origin master

	# 回到原来的目录
	cd $cur
	echo ---commit end
}

# 显示帮助信息
help(){
	# 微信h5版本
	echo ----微信h5版本--------
	echo ./run.sh build			"#"构建代码 
	echo ./run.sh init			"#"初始化git仓库
	echo ./run.sh commit		"#"提交到git 
	echo ./run.sh	 			"#"执行全部任务
	echo ./run.sh hello			"#"hello
	echo ./run.sh test			"#"test

	echo ./run.sh beta			"#"一键构建和提交beta版本
	# app内嵌版本
	echo ----app内嵌版本--------
	echo ./run.sh app			"#"一键构建和提交app版本

	echo ----帮助信息--------
	echo ./run.sh help			"#"帮助
}

# 测试用的
test(){
	echo "a test empty task"
}

# 入口
if [[ $# -lt 1  ||  $1 = 'app'  ||  $1 = 'beta' ||  $1 = 'beta1' ||  $1 = 'beta2' ]]; then
	# 无参数则打pro包，否则打相应类型的包
	if [ $# -lt 1 ];then
		type=pro
	else
		type=$1
	fi
	
	echo ===\>准备构建${type}版
	initContext $type && init && resetDist

	# 构建代码
	buildRes=$(build)

	# 检查构建结果
	echo -e "$buildRes"

	if [[ $buildRes =~ "ERROR" ]]; then
		echo "$(tput setaf 1)xxx\>build error,task abort$(tput sgr0)"
	else
		# 代码构建成功才继续。
		checkRes=$(checkBuild)
		
		if [ $checkRes == "ok" ];then
		 	cpCode && commit
			echo "$(tput setaf 2)===\>task complete$(tput sgr0)"
		else
			echo "$(tput setaf 1)xxx\>build error,task abort$(tput sgr0)"
		fi
	fi


elif [ $1 ]; then
	# 参数不是包类型的，当中函数处理
	echo ===\>准备执行${1}函数
	initContext beta

	func=$1
	$func
	echo ===\>task complete
fi
