from paramiko import SSHClient, AutoAddPolicy


commands = [
		'cd next-game',
		'npm install',
		'git pull',
		'npm run build',
		'pm2 reload next-game'
	]


client = SSHClient()
client.set_missing_host_key_policy(AutoAddPolicy())
client.connect('192.168.1.102', username='pi')
command = ' && '.join(commands)
stdin, stdout, stderr = client.exec_command(command)
print(command)

stdin.channel.shutdown_write()

print(f'STDOUT: {stdout.read().decode("utf8")}')
print(f'STDERR: {stderr.read().decode("utf8")}')

stdin.close()
stdout.close()
stderr.close()

client.close()