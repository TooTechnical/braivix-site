"""
Example FastAPI endpoint for the website's "Run Offline Test" form.
Just a suggestion — adapt to the existing backend however you prefer.

The Next.js route app/api/lead/route.ts POSTs this JSON:
  { name, bank, role, email, source, page, submitted_at, user_agent }
with header X-Lead-Token: <LEAD_WEBHOOK_TOKEN> (if set).
"""
import os
from datetime import datetime

from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel, EmailStr

router = APIRouter()


class Lead(BaseModel):
    name: str
    bank: str
    role: str
    email: EmailStr
    source: str = "offline-test"
    page: str | None = None
    submitted_at: datetime
    user_agent: str | None = None


@router.post("/leads/offline-test", status_code=201)
async def create_lead(lead: Lead, x_lead_token: str | None = Header(default=None)):
    if x_lead_token != os.environ.get("LEAD_WEBHOOK_TOKEN"):
        raise HTTPException(status_code=401)

    # 1) store, e.g.:
    # INSERT INTO website_leads (name, bank, role, email, source, page, submitted_at, user_agent)
    # VALUES (...)

    # 2) notify the team, e.g. send an email to m.smirnova@braivix.com and d.malone@braivix.com

    return {"ok": True}
