#!/usr/bin/env bash
set -e
export QUARTO_PYTHON="$(pixi run which python)"
quarto render watershed-network-resilience.qmd
echo "==> Done. Output in docs/"
