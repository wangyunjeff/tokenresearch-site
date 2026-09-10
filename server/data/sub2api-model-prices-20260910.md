# Sub2API 分组实际消耗价格（2026-09-10）

换算规则：数据库实际美元/token价格 × 当前分组 rate_multiplier ÷ 5 = 站内人民币/token价格。缓存列是 cache-read；“-”表示该模型的历史记录没有观测到对应缓存 token，不能据此断言接口不支持缓存。以下模型清单来自生产 usage_logs 的实际使用记录；同一价格档位合并展示。

## plus (group_id=2, rate_multiplier=1.0500)
| Billing mode | Input RMB/token | Cache-read RMB/token | Output RMB/token | Models |
|---|---:|---:|---:|---|
| token | 1.05e-06 | 1.05e-07 | 6.3e-06 | GPT-5.5, GPT5.5, claude-opus-4-8, claude-opus-5, claude-sonnet-4-6, claude-sonnet-5, gpt-5.5, gpt-5.5-turbo, gpt-5.6, gpt-5.6 Sol, gpt-5.6-sol, gpt-6 |
| token | 1.575e-07 | - | 9.45e-07 | claude-3-haiku, claude-haiku-4-5 |
| token | 1.05e-06 | - | 6.3e-06 | claude-3-opus, claude-3-opus-20240229, claude-3-sonnet, claude-3-sonnet-20240229, claude-3.5-sonnet, claude-3.5-sonnet-20241022, claude-5-sonnet, claude-opus-4.8, claude-sonnet-5-20250514, gpt 5.5 |
| token | 1.575e-07 | 1.575e-08 | 9.45e-07 | claude-haiku-4-5-20251001, gpt-5.4-mini |
| token | 4.2e-08 | 4.2e-09 | 2.52e-07 | codex-auto-review, gpt-5.6-luna |
| token | 2.625e-07 | 2.625e-08 | 2.1e-06 | gpt-5 |
| token | 5.25e-07 | 5.25e-08 | 3.15e-06 | gpt-5.4 |
| token | 6.3e-06 | 6.3e-07 | 3.78e-05 | gpt-5.5-pro |
| token | 4.2e-07 | 4.2e-08 | 2.52e-06 | gpt-5.6-terra |
| token | 2.1e-06 | 2.1e-07 | 1.05e-05 | gpt-6-astra |
| token | 1.05e-06 | - | 0 | gpt-image-1, gpt-image-1.5 |
| token | 1.05e-06 | 2.625e-07 | 0 | gpt-image-2 |

## pro (group_id=13, rate_multiplier=1.3000)
| Billing mode | Input RMB/token | Cache-read RMB/token | Output RMB/token | Models |
|---|---:|---:|---:|---|
| token | 1.3e-06 | - | 7.8e-06 | GPT 5.6 Sol, claude-opus-4-6 |
| token | 1.3e-06 | 1.3e-07 | 7.8e-06 | GPT-5.6 Sol, claude-3-5-sonnet-latest, claude-opus-4-8, claude-opus-5, claude-sonnet-5, gpt-5.5, gpt-5.6, gpt-5.6-Sol, gpt-5.6-sol |
| token | 1.95e-07 | 1.95e-08 | 1.17e-06 | claude-3-haiku-latest, gpt-5.4-mini |
| token | 1.95e-07 | - | 1.17e-06 | claude-haiku-4-5-20251001 |
| token | 5.2e-08 | 5.2e-09 | 3.12e-07 | codex-auto-review, gpt-5.6-luna |
| token | 6.5e-07 | 6.5e-08 | 3.9e-06 | gpt-5.4 |
| token | 6.5e-07 | - | 3.9e-06 | gpt-5.4-2026-03-05 |
| token | 5.2e-07 | 5.2e-08 | 3.12e-06 | gpt-5.6-terra |
| token | 2.6e-06 | - | 1.3e-05 | gpt-6 |
| token | 2.6e-06 | 2.6e-07 | 1.3e-05 | gpt-6-astra |
| token | 1.3e-06 | - | 0 | gpt-image-1 |
| token | 1.3e-06 | 3.25e-07 | 0 | gpt-image-2 |

## claude-max满血 (group_id=30, rate_multiplier=5.5000)
| Billing mode | Input RMB/token | Cache-read RMB/token | Output RMB/token | Models |
|---|---:|---:|---:|---|
| token | 1.1e-05 | 1.1e-06 | 5.5e-05 | claude-fable-5 |
| token | 1.1e-05 | 2.75e-07 | 5.5e-05 | claude-fable-5-1 |
| token | 1.1e-06 | 1.1e-07 | 5.5e-06 | claude-haiku-4-5-20251001 |
| token | 5.5e-06 | 5.5e-07 | 2.75e-05 | claude-opus-4-6, claude-opus-4-7, claude-opus-4-8, claude-opus-5 |
| token | 3.3e-06 | 3.3e-07 | 1.65e-05 | claude-sonnet-4-6 |
| token | 2.2e-06 | 2.2e-07 | 1.1e-05 | claude-sonnet-5 |

## 薅资本主义羊毛（慈禧太后已经付过钱了） (group_id=32, rate_multiplier=0.7500)
| Billing mode | Input RMB/token | Cache-read RMB/token | Output RMB/token | Models |
|---|---:|---:|---:|---|
| token | 3e-08 | 3e-09 | 1.8e-07 | GPT-5.6 Luna, claude-haiku-4-5-20251001, codex-auto-review, gpt-5.6 Luna, gpt-5.6-luna |
| token | 7.5e-07 | 7.5e-08 | 4.5e-06 | GPT-5.6 Sol, GPT-5.6-sol, claude-opus-5, claude-sonnet-5, gpt-5.5, gpt-5.6, gpt-5.6 Sol, gpt-5.6-sol |
| token | 7.5e-07 | - | 4.5e-06 | claude-sonnet-4-5, gpt-5.6 sol, gpt5.6 |
| token | 3.75e-07 | 3.75e-08 | 2.25e-06 | gpt-5., gpt-5.4 |
| token | 2.625e-07 | 2.625e-08 | 2.1e-06 | gpt-5.3-codex-spark |
| token | 1.125e-07 | 1.125e-08 | 6.75e-07 | gpt-5.4-mini |
| token | 3e-07 | 3e-08 | 1.8e-06 | gpt-5.6-terra |
| token | 1.5e-06 | - | 7.5e-06 | gpt-6 |
| token | 1.5e-06 | 1.5e-07 | 7.5e-06 | gpt-6-astra |
| token | 1.125e-07 | - | 6.75e-07 | gpt5.4-mini |
| token | 3e-08 | - | 1.8e-07 | gpt5.6-luna |

## kiro-高缓存1m上下文 (group_id=35, rate_multiplier=0.7000)
| Billing mode | Input RMB/token | Cache-read RMB/token | Output RMB/token | Models |
|---|---:|---:|---:|---|
| token | 1.4e-07 | 1.4e-08 | 7e-07 | claude-3-5-haiku-20241022, claude-haiku-4-5, claude-haiku-4-5-20251001 |
| token | 1.4e-06 | 1.4e-07 | 7e-06 | claude-fable-5 |
| token | 7e-07 | 7e-08 | 3.5e-06 | claude-opus-4-6, claude-opus-4-7, claude-opus-4-8, claude-opus-4.6, claude-opus-4.8, claude-opus-5 |
| token | 4.2e-07 | 4.2e-08 | 2.1e-06 | claude-sonnet-4-6 |
| token | 4.2e-07 | - | 2.1e-06 | claude-sonnet-4-6-kiro |
| token | 2.8e-07 | 2.8e-08 | 1.4e-06 | claude-sonnet-5 |
| token | 1.4e-07 | - | 8.4e-07 | gpt-5.6-luna |
| token | 7e-07 | - | 4.2e-06 | gpt-5.6-sol |
| token | 3.5e-07 | - | 2.1e-06 | gpt-5.6-terra |

## 【Grok】Grok-heavy (group_id=39, rate_multiplier=1.2000)
| Billing mode | Input RMB/token | Cache-read RMB/token | Output RMB/token | Models |
|---|---:|---:|---:|---|
| token | 4.8e-07 | 1.2e-07 | 1.44e-06 | claude-3-5-sonnet-latest, claude-haiku-4-5-20251001, claude-opus-4-20250514, claude-opus-4-8, claude-opus-5, claude-sonnet-4-20250514, claude-sonnet-4-6, claude-sonnet-5, gpt-5.6, grok, grok-4.5-latest, grok-4.6, grok-4.6-latest, grok-latest, grok/grok-4.6 |
| token | 1.2e-06 | 1.2e-07 | 7.2e-06 | gpt-5.5 |
| token | 4.8e-08 | 4.8e-09 | 2.88e-07 | gpt-5.6-luna |
| token | 2.4e-06 | 2.4e-07 | 1.2e-05 | gpt-6-astra |
| token | 3e-07 | 4.8e-08 | 6e-07 | grok-4.3 |
| token | 4.8e-07 | 7.2e-08 | 1.44e-06 | grok-4.5 |
| token | 2.4e-07 | 4.8e-08 | 4.8e-07 | grok-build-latest, grok-composer-2.5-fast |

## pro快速通道 (group_id=42, rate_multiplier=1.0500)
| Billing mode | Input RMB/token | Cache-read RMB/token | Output RMB/token | Models |
|---|---:|---:|---:|---|
| token | 1.05e-06 | 1.05e-07 | 6.3e-06 | GPT-5.6 Sol, gpt-5.5, gpt-5.6, gpt-5.6-sol |
| token | 4.2e-08 | 4.2e-09 | 2.52e-07 | codex-auto-review, gpt-5.6-luna |
| token | 3.675e-07 | 3.675e-08 | 2.94e-06 | gpt-5.3-codex-spark |
| token | 5.25e-07 | 5.25e-08 | 3.15e-06 | gpt-5.4 |
| token | 1.575e-07 | 1.575e-08 | 9.45e-07 | gpt-5.4-mini |
| token | 4.2e-07 | 4.2e-08 | 2.52e-06 | gpt-5.6-terra |
| token | 2.1e-06 | 2.1e-07 | 1.05e-05 | gpt-6-astra |

## kiro快速通道（测试中） (group_id=50, rate_multiplier=0.1000)
| Billing mode | Input RMB/token | Cache-read RMB/token | Output RMB/token | Models |
|---|---:|---:|---:|---|
| token | 6e-08 | - | 3e-07 | claude-sonnet-4.5 |
| token | 0 | - | 0 | deepseek-3.2 |

## 【Anthropic】Kiro-claude正价版 (group_id=56, rate_multiplier=2.0000)
| Billing mode | Input RMB/token | Cache-read RMB/token | Output RMB/token | Models |
|---|---:|---:|---:|---|
| token | 4e-07 | 4e-08 | 2e-06 | claude-haiku-4-5-20251001 |
| token | 2e-06 | 2e-07 | 1e-05 | claude-opus-4-6, claude-opus-5 |
| token | 8e-07 | 8e-08 | 4e-06 | claude-sonnet-5 |

## 【国产模型补贴】 (group_id=59, rate_multiplier=0.1000)
| Billing mode | Input RMB/token | Cache-read RMB/token | Output RMB/token | Models |
|---|---:|---:|---:|---|
| token | 6e-09 | - | 2.4e-08 | MiniMax-M2.7 |
| token | 1.2e-08 | 2.4e-09 | 4.8e-08 | MiniMax-M3 |
| token | 4.4e-09 | 1.4e-10 | 1.32e-08 | deepseek-v4-flash, deepseek-v4-flash-0731 |
| token | 1.12e-08 | - | 4.48e-08 | kimi-k2.7-code |
| token | 6e-08 | 6e-09 | 3e-07 | kimi-k3 |
| token | 0 | - | 0 | qwen3.8-flash, qwen3.8-max |
| token | 0 | 0 | 0 | qwen3.8-max-0902 |

## 【国产模型】 (group_id=60, rate_multiplier=1.5000)
| Billing mode | Input RMB/token | Cache-read RMB/token | Output RMB/token | Models |
|---|---:|---:|---:|---|
| token | 9e-08 | - | 3.6e-07 | MiniMax-M2.7 |
| token | 1.8e-07 | 3.6e-08 | 7.2e-07 | MiniMax-M3 |
| token | 1.32e-07 | - | 3.96e-07 | deepseek-v4-flash |
| token | 4.2e-07 | 7.8e-08 | 1.32e-06 | glm-5.2 |
| token | 1.68e-07 | - | 6.72e-07 | kimi-k2.7-code |
| token | 9e-07 | - | 4.5e-06 | kimi-k3 |
| token | 0 | - | 0 | qwen3.8-flash, qwen3.8-max |
| token | 0 | 0 | 0 | qwen3.8-max-0902 |



## 补充

- 生产数据库没有名为“Cloud”的分组；这里将你说的 Cloud 按 Claude 理解，列出 `claude-max满血`。如果你指的是另一个分组，需要给出准确名称。
- `grok视频生成(测试中)` 是 video 计费，不是 input/cache/output token 计费，因此未放入上面的 token 表。
- `国产模型-openai协议` 与 `国产模型-anthropic协议` 当前 channel pricing 明确配置为 `glm-5.2`：美元输入 0.000008/token、缓存输入 0.000002/token、输出 0.000028/token；组倍率 1.2 后，站内人民币分别为 0.00000192、0.00000048、0.00000672 元/token。该两组当前 usage_logs 没有足够的 token 计费记录，所以单独标为配置价格。

