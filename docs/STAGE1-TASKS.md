# 1단계 작업 계획 (Shrimp Task Manager)

> [`docs/ROADMAP.md`](./ROADMAP.md) 1단계 "프로젝트 초기 설정(골격 구축)"을 Shrimp Task Manager로
> 분해한 실행 계획. 총 **7개 태스크**. 결정 근거는 [`docs/STAGE1-DECISIONS.md`](./STAGE1-DECISIONS.md).

## 실행 원칙

- **노션 API 우선 검증(R1)**: 학습 데이터와 다를 수 있으므로 문서 확인(T2) 전 연동 코드 금지.
- **사람 의존성 분리**: 발행자 결정·워크스페이스·자격증명이 필요한 태스크를 명시해, 대기 중에도
  독립 태스크(T5·T6)를 먼저 진행할 수 있게 배치.

## Phase 1 — 결정·문서·독립 골격 (즉시 착수)

| ID | 태스크 | 산출물 | 상태 |
|----|--------|--------|:----:|
| **T1** | 선결조건 결정·검증 체크리스트 | `docs/STAGE1-DECISIONS.md` | ✅ 완료 |
| **T4** | 환경변수 골격 | `.env.example`(6키) | ⬜ 대기 |
| **T5** | 라우트 뼈대·nav 불변식 | `/q/[token]`·`/dashboard/quotes` + nav-config | ⬜ 대기 |
| **T6** | `src/proxy.ts` 인증 게이트 골격 | `src/proxy.ts` | ⬜ 대기 |

## Phase 2 — 노션 검증·스키마 생성 (T1 이후)

| ID | 태스크 | 산출물 | 상태 |
|----|--------|--------|:----:|
| **T2** | 노션 API 문서 검증 스파이크 | `docs/notion-api-verified.md` | ⬜ 대기 |
| **T3** | 노션 스키마 생성(견적서·견적품목 DB + relation) | 노션 DB 2개 + DB ID | ⬜ 대기 |

## Phase 3 — 통합·실측 (관문)

| ID | 태스크 | 산출물 | 상태 |
|----|--------|--------|:----:|
| **T7** | `src/lib/notion` 경계 + **견적서 1건 raw 조회 실측** | `src/lib/notion/client.ts` + 콘솔 출력 성공 | ⬜ 대기 |

## 의존성 그래프

```
T1 ──┬─> T2 ─┐
     └─> T3 ─┤
T4 ──────────┼─> T7   (T7 = 1단계 완료 관문)
T5 (독립)    │
T6 (독립)    │
```

## 1단계 완료 기준 (ROADMAP)

- [ ] `npm run build` 타입 통과 (dev 종료 후 `rm -rf .next && npm run build`)
- [ ] 노션 견적서 1건 raw 조회 콘솔 출력 성공
- [ ] `/q/[token]`·`/dashboard/quotes`·`/login` 빈 라우트가 셸과 함께 200
- [ ] PRD 10.4 "검증 필요" 6항목 전부 "확인됨"으로 갱신 (A-7 해소)
