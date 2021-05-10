import asyncio

import rich
from rich.console import Console as RichConsole
from rich.progress import BarColumn, Progress, TextColumn, TimeRemainingColumn

from marker.utils.console import ConsoleABC
from .jobs import JobTracker

class WebConsole(ConsoleABC, RichConsole):
    def __init__(self):
        super().__init__()
    
    def error(self, *args, **kwargs):
        self.print(f'[-]', *args, style="red", **kwargs)
        JobTracker.addMessage('ERR: ' + " ".join(map(str,args)))
        JobTracker.errors = True

    def log(self, *args, **kwargs):
        self.print('[+]', *args, style="green", **kwargs)
        JobTracker.addMessage('LOG: ' + " ".join(map(str,args)))
    
    def get(self, prompt, **kwargs):
        return self.input(f'[yellow][?] {prompt}: ', **kwargs)

    def ask(self, prompt, default=False, **kwargs):
        return default
    
    def track(self, tasks, label="Processing"):
        JobTracker.setTotal(len(tasks))
        for task in tasks:
            yield task
            JobTracker.updateProgress(1)
            if JobTracker.shouldExitNow:
                JobTracker.threadExit()
        JobTracker.finishJob()

    async def track_async(self, tasks, label="Processing"):
        JobTracker.setTotal(len(tasks))
        results = []
        for task in asyncio.as_completed(tasks):
            try:
                result = await task
                results.append(result)
            except Exception as e:
                self.error("Exception occured:", e)
            JobTracker.updateProgress(1)
            if JobTracker.shouldExitNow:
                JobTracker.threadExit()
        JobTracker.finishJob()
        return results