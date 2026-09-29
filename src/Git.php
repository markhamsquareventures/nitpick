<?php

namespace MarkhamSq\Nitpick;

use Illuminate\Support\Facades\Process;
use MarkhamSq\Nitpick\Exporters\MarkdownExporter;

/** Reads the git state of the app repo (base_path()). Each method gives null outside a git repo. */
class Git
{
    public function userName(): ?string
    {
        return $this->run(['git', 'config', 'user.name']);
    }

    /** The full SHA of HEAD, or null in a repo with no commit. */
    public function head(): ?string
    {
        return $this->run(['git', 'rev-parse', '--verify', '--quiet', 'HEAD']);
    }

    /**
     * True when the work tree has a change outside the report directory. An uncommitted report
     * of an earlier round is not a change to the code under test.
     */
    public function isDirty(): ?bool
    {
        $status = $this->run(['git', 'status', '--porcelain', '--', '.', ':(exclude)'.MarkdownExporter::DIRECTORY]);

        if ($status === null) {
            return null;
        }

        return $status !== '';
    }

    /** @param list<string> $command */
    private function run(array $command): ?string
    {
        $result = Process::path(base_path())->run($command);

        if ($result->failed()) {
            return null;
        }

        return trim($result->output());
    }
}
